import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {
  checkAuthToken, clearCookies,
  deleteCookie, getAccessTokenFromCookies,
  getCookieByName, getRefreshTokenFromCookies,
  saveAccessTokenInCookies,
  saveRefreshTokenInCookies,
} from '../../utils/api';
import {
  ACCESS_TOKEN_NAME,
  CHANGE_USER_DATA_ENDPOINT,
  GET_METHOD,
  LOGOUT_URL,
  PATCH_METHOD,
  POST_METHOD,
  REFRESH_TOKEN_ENDPOINT,
  REFRESH_TOKEN_NAME,
} from '../../utils/constants';

export const refreshAccessToken = createAsyncThunk('profile/refreshAccessToken',
  async (args, {rejectWithValue}) => {
    const refreshToken = getRefreshTokenFromCookies();
    if (!refreshToken) {
      return rejectWithValue('No refresh token available.');
    }
    try {
      const headers = { token: refreshToken };
      const response = await fetchAPI(
          REFRESH_TOKEN_ENDPOINT, POST_METHOD, headers
      );
      if (response && response.success) {
        saveAccessTokenInCookies(response[ACCESS_TOKEN_NAME]);
        saveRefreshTokenInCookies(response[REFRESH_TOKEN_NAME]);
        return response;
      } else {
        const error = response?.message || 'Failed to refresh access token.';
        return rejectWithValue(error);
      }
    } catch (error) {
      // Очищаем токены, так как запрос на их обновление не удался
      clearCookies([ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME]);
      return rejectWithValue(error.message || 'An error occurred during fetching.');
    }
  }
);
export const logoutUser = createAsyncThunk('profile/logoutUser',
  async (args, {rejectedWithValue}) => {
    const refreshToken = getRefreshTokenFromCookies();
    if (refreshToken) {
      const bodyData = {
        token: refreshToken,
      };
      const response = await fetchAPI(LOGOUT_URL, POST_METHOD, bodyData, null);
      if (response && response.success) {
        deleteCookie(ACCESS_TOKEN_NAME);
        deleteCookie(REFRESH_TOKEN_NAME);
      }
    }
  },
);
export const changeUserData = createAsyncThunk('profile/changeUserData',
  async (userData, {rejectedWithValue}) => {
    const accessToken = getAccessTokenFromCookies();
    if(accessToken) {
      const authorizationHeader = {
        Authorization: accessToken
      };
      const response = await fetchAPI(
        CHANGE_USER_DATA_ENDPOINT, PATCH_METHOD, userData, authorizationHeader);
      return {
        name: response.user.name,
        login: response.user.email
      }
    }
  },

);
export const getUserData = createAsyncThunk('profile/getUserData',
  async (ags, {rejectedWithValue}) => {
    const getUserDataUrl = 'https://norma.nomoreparties.space/api/auth/user';
    const authToken = getAccessTokenFromCookies();
    if (authToken) {
      try {
        const response = await fetchAPI(getUserDataUrl, GET_METHOD, null,
          {Authorization: authToken},
        );
        return {
          name: response.user.name,
          login: response.user.email,
        };
      }
      catch (error) {
        return rejectedWithValue(error);
      }

    }

  },
);
export const profileSlice = createSlice({
  name: 'profilePage',
  initialState: {
    name: '',
    nameInputError: '',
    login: '',
    loginInputError: '',
    password: '',
    passwordInputError: '',
    isProfilePageAvailable: false,
  },
  reducers: {
    setProfileName(state, action) {
      state.name = action.payload;
    },
    setNameInputError(state, action) {
      state.nameInputError = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
    setLoginInputError(state, action) {
      state.loginInputError = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPasswordInputError(state, action) {
      state.passwordInputError = action.payload;
    },
    setProfilePageAvailable(state) {
      state.isProfilePageAvailable = checkAuthToken();
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.name = '';
      state.login = '';
      state.isProfilePageAvailable = false;
    });
    builder.addCase(changeUserData.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.user) {
        state.name = action.payload.name;
        state.login = action.payload.email;
      }
    })
  },
});
export const selectProfileName = state => state.profilePage.name;
export const selectProfileNameInputError = state => state.profilePage.nameInputError;
export const selectProfileLogin = state => state.profilePage.login;
export const selectProfileLoginInputError = state => state.profilePage.loginInputError;
export const selectProfilePassword = state => state.profilePage.password;
export const selectProfilePasswordInputError = state => state.profilePage.passwordInputError;
export const profilePageAvailability = state => state.profilePage.isProfilePageAvailable;
export const {
  setProfileName,
  setNameInputError,
  setLogin,
  setLoginInputError,
  setPassword,
  setPasswordInputError,
  setProfilePageAvailable,
} = profileSlice.actions;