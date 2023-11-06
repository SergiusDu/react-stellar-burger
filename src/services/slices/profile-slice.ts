import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {
  checkAuthToken,
  clearCookies,
  deleteCookie,
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
  saveAccessTokenInCookies,
  saveRefreshTokenInCookies,
} from '../../utils/api';
import {
  ACCESS_TOKEN_NAME,
  CHANGE_USER_DATA_ENDPOINT,
  GET_METHOD,
  GET_USER_DATA_ENDPOINT,
  LOGOUT_URL,
  PATCH_METHOD,
  POST_METHOD,
  REFRESH_TOKEN_ENDPOINT,
  REFRESH_TOKEN_NAME,
} from '../../utils/constants';
import {RootState} from '../store/store';
import {isErrorWithResponse, TTokenString, TUserData} from '../../utils/types';


export const refreshAccessToken = createAsyncThunk<string, void, { rejectValue: string }>('profile/refreshAccessToken',
  async (
    _,
    {
      rejectWithValue,
    },
  ) => {
    const refreshToken = getRefreshTokenFromCookies();
    if (!refreshToken) {
      return rejectWithValue('No refresh token available.');
    }
    try {
      const headers = {token: refreshToken};
      const response = await fetchAPI(REFRESH_TOKEN_ENDPOINT, POST_METHOD, headers);
      if (response && response.success) {
        saveAccessTokenInCookies(response.accessToken);
        saveRefreshTokenInCookies(response.refreshToken);
        return response.accessToken; // Возвращаем новый accessToken
      } else {
        const error = response?.message || 'Failed to refresh access token.';
        return rejectWithValue(error);
      }
    } catch (error: unknown) {
      clearCookies([ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME]);
      return rejectWithValue('An error occurred during fetching.');
    }
  });
export const logoutUser = createAsyncThunk<void, void, { state: RootState }>('profile/logoutUser', async () => {
  const refreshToken = getRefreshTokenFromCookies();
  if (refreshToken) {
    const bodyData = {
      token: refreshToken,
    };
    const response = await fetchAPI(LOGOUT_URL, POST_METHOD, bodyData, null);
    if (response?.success) {
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
    }
  }
});

export const changeUserData = createAsyncThunk('profile/changeUserData', async (
  userData: TUserData,
  {
    dispatch, rejectWithValue,
  },
) => {
  const accessToken = getAccessTokenFromCookies();
  if (!accessToken) {
    return rejectWithValue('Access token is not available');
  }

  const sendRequestWithToken = async (
    token: TTokenString,
    userData: TUserData,
  ) => {
    try {
      const response = await fetchAPI(CHANGE_USER_DATA_ENDPOINT, PATCH_METHOD, userData, {Authorization: token});
      if (response?.user && response.user?.name && response.user?.email) {
        return {
          name: response.user.name, email: response.user.email,
        };
      } else {
        console.error('Invalid response format: ', response);
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      if (isErrorWithResponse(error)) {
        return Promise.reject(rejectWithValue(error.status));
      } else {
        return Promise.reject(rejectWithValue('Unknown error was occurred'));
      }
    }
  };

  const handleTokenRequestWithRefresh = async (token: TTokenString) => {
    try {
      return await sendRequestWithToken(accessToken, userData);
    } catch (error: unknown) {
      if (isErrorWithResponse(error)) {
        // Если fetchAPI выбросил исключение, мы его здесь перехватываем
        if (error.name === 'AbortError') {
          return Promise.reject(rejectWithValue('Request was aborted'));
        }
        if (error.message === 'Failed to fetch') {
          return Promise.reject(rejectWithValue('Network request failed'));
        }
        // Перехватываем ошибку, если токен устарел
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          try {
            // Попытка обновить токен
            const newToken = await dispatch(refreshAccessToken()).unwrap();
            // Повтор запроса с новым токеном
            return await sendRequestWithToken(newToken, userData);
          } catch (refreshError) {
            // Если обновление токена не удалось разлогиниваемся и возвращаем ошибку
            dispatch(logoutUser);
            return Promise.reject((rejectWithValue('Failed to refresh token')));
          }
        }
        // Для остальных ошибок просто возвращаем сообщение
        return Promise.reject((rejectWithValue(error.message)));
      }
    }
  };

  // Первая попытка отправить запрос с текущим токеном
  return handleTokenRequestWithRefresh(accessToken);
});

export const getUserData = createAsyncThunk('profile/getUserData', async (
  _,
  {
    dispatch, rejectWithValue,
  },
) => {
  const authToken = getAccessTokenFromCookies();
  try {
    const response = await fetchAPI(GET_USER_DATA_ENDPOINT, GET_METHOD, null, {Authorization: authToken});
    return {
      name: response.user.name, login: response.user.email,
    };
  } catch (error: unknown) {
    if (isErrorWithResponse(error)) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        const newToken = await dispatch(refreshAccessToken()).unwrap();
        if (newToken) {
          const retryResponse = await fetchAPI(GET_USER_DATA_ENDPOINT, GET_METHOD, null, {Authorization: newToken});
          return {
            name: retryResponse.user.name, login: retryResponse.user.email,
          };
        }
      }
    }
    return rejectWithValue('Unknown error');
  }
});


interface ProfileState {
  name: string;
  nameInputError: string;
  login: string;
  loginInputError: string;
  password: string;
  passwordInputError: string;
  isProfilePageAvailable: boolean;
}

const initialState: ProfileState = {
  name: '', nameInputError: '', login: '', loginInputError: '', password: '', passwordInputError: '', isProfilePageAvailable: false,
};
export const profileSlice = createSlice({
  name: 'profilePage', initialState, reducers: {
    setProfileName(
      state,
      action,
    ) {
      state.name = action.payload;
    }, setNameInputError(
      state,
      action,
    ) {
      state.nameInputError = action.payload;
    }, setLogin(
      state,
      action,
    ) {
      state.login = action.payload;
    }, setLoginInputError(
      state,
      action,
    ) {
      state.loginInputError = action.payload;
    }, setPassword(
      state,
      action,
    ) {
      state.password = action.payload;
    }, setPasswordInputError(
      state,
      action,
    ) {
      state.passwordInputError = action.payload;
    }, setProfilePageAvailable(state) {
      state.isProfilePageAvailable = checkAuthToken();
    },
  }, extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (
      state,
      action,
    ) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.name = '';
      state.login = '';
      state.isProfilePageAvailable = false;
    });
    builder.addCase(changeUserData.fulfilled, (
      state,
      action,
    ) => {
      if (action?.payload && action.payload?.name && action.payload?.email) {
        state.name = action.payload.name;
        state.login = action.payload.email;
      }
    });
  },
});
export const selectProfileName = (state: RootState) => state.profilePage.name;
export const selectProfileNameInputError = (state: RootState) => state.profilePage.nameInputError;
export const selectProfileLogin = (state: RootState) => state.profilePage.login;
export const selectProfileLoginInputError = (state: RootState) => state.profilePage.loginInputError;
export const selectProfilePassword = (state: RootState) => state.profilePage.password;
export const selectProfilePasswordInputError = (state: RootState) => state.profilePage.passwordInputError;
export const profilePageAvailability = (state: RootState) => state.profilePage.isProfilePageAvailable;
export const {
  setProfileName, setNameInputError, setLogin, setLoginInputError, setPassword, setPasswordInputError, setProfilePageAvailable,
} = profileSlice.actions;