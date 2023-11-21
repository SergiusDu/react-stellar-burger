import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAPI, setCookie} from '../../utils/api';
import {ACCESS_TOKEN_NAME, LOGIN_ENDPOINT, REFRESH_TOKEN_NAME} from '../../utils/constants';
import {RootState} from '../store/store';
import {TUserData} from '../../utils/types';


export const authorizeUser = createAsyncThunk('login/sendAuthorization', async (
  userData: TUserData,
  {rejectWithValue},
) => {
  const response = await fetchAPI(LOGIN_ENDPOINT, 'POST', userData);
  if (response.success) {
    return response;
  } else {
    console.log(`Ошибка в авторизации пользователя: ${response.message}`);
    return rejectWithValue(response);
  }
});

type TLoginState = {
  isLoading: boolean;
  email: string;
  emailErrorMessage: string;
  password: string;
  redirectAfterLogin: string;
};

export const loginSliceInitialState: TLoginState = {
  isLoading: false,
  email: '',
  emailErrorMessage: '',
  password: '',
  redirectAfterLogin: '/',
};
export const loginSlice = createSlice({
  name: 'loginData',
  initialState: loginSliceInitialState,
  reducers: {
    setLoginEmailInputValue(
      state,
      action,
    ) {
      state.email = action.payload;
    },
    setLoginEmailInputError(
      state,
      action,
    ) {
      state.emailErrorMessage = action.payload;
    },
    setLoginPasswordInputValue(
      state,
      action,
    ) {
      state.password = action.payload;
    },
    setRedirectAfterLogin(
      state,
      action,
    ) {
      state.redirectAfterLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizeUser.fulfilled, (
      state,
      action,
    ) => {
      setCookie(ACCESS_TOKEN_NAME, action.payload.accessToken, 20 * 60);
      setCookie(REFRESH_TOKEN_NAME, action.payload.refreshToken, 60 * 60 * 2);
      state.email = '';
      state.password = '';
    });
  },
});

export const {
  setLoginEmailInputValue,
  setLoginEmailInputError,
  setLoginPasswordInputValue,
  setRedirectAfterLogin,
} = loginSlice.actions;
export const loginEmailInputValue = (state: RootState) => state.loginData.email;
export const loginEmailInputErrorMessage = (state: RootState) => state.loginData.emailErrorMessage;
export const loginPasswordInputValue = (state: RootState) => state.loginData.password;
export const redirectAfterLoginSuccess = (state: RootState) => state.loginData.redirectAfterLogin;