import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAPI} from '../../utils/api';
import {RESET_PASSWORD_STEP_TWO_ENDPOINT} from '../../utils/constants';
import {RootState} from '../store/store';
import {
  IPasswordAndToken,
  isIRejectedResponse,
  isISuccessResponse, ISuccessResponse,
  PasswordString,
  TResponse,
  TNullableToken,
} from '../../utils/types';

interface ResetPasswordState {
  newPassword: PasswordString;
  newPasswordErrorMessage: string;
  token: TNullableToken;
  tokenErrorMessage: string;
  serverResponseErrorMessage: string;
  isAvailable: boolean;
}

export const resetPassword = createAsyncThunk<ISuccessResponse, IPasswordAndToken, {
  rejectValue: string; // Тип данных для rejectWithValue
  state: RootState; // Тип данных состояния
}>(
  'resetPasswordForm/reset-password',
  async (PasswordAndToken: IPasswordAndToken, {rejectWithValue}) => {
    const response: TResponse = await fetchAPI(
      RESET_PASSWORD_STEP_TWO_ENDPOINT, 'POST', PasswordAndToken);
    if (isISuccessResponse(response)) {
      return response;
    }
    else if (isIRejectedResponse(response)) {
      return rejectWithValue(response.message);
    }
    else {
      return rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const resetPasswordFormSliceInitialState: ResetPasswordState = {
  newPassword: '',
  newPasswordErrorMessage: '',
  token: '',
  tokenErrorMessage: '',
  serverResponseErrorMessage: '',
  isAvailable: false,
};
export const resetPasswordFormSlice = createSlice({
  name: 'forgotPasswordForm',
  initialState: resetPasswordFormSliceInitialState,
  reducers: {
    setResetPasswordNewPasswordInput(state, action) {
      state.newPassword = action.payload;
    },
    setResetPasswordNewPasswordErrorMessage(state, action) {
      state.newPasswordErrorMessage = action.payload;
    },
    setResetPasswordTokenInput(state, action) {
      state.token = action.payload;
    },
    setTokenErrorMessage(state, action) {
      state.tokenErrorMessage = action.payload;
    },
    setResetPasswordPageAvailability(state, action) {
      state.isAvailable = action.payload;
    },
    setServerResponseErrorMessage(state, action) {
      state.serverResponseErrorMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.serverResponseErrorMessage = '';
      state.isAvailable = false;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.serverResponseErrorMessage = action.payload ?? 'Произошла неожиданная ошибка';
    });
  },
});

export const {
  setResetPasswordNewPasswordInput,
  setResetPasswordNewPasswordErrorMessage,
  setResetPasswordTokenInput,
  setTokenErrorMessage,
  setResetPasswordPageAvailability,
  setServerResponseErrorMessage,
} = resetPasswordFormSlice.actions;

export const selectResetPasswordNewPasswordInput = (state: RootState) => state.resetPasswordForm.newPassword;
export const selectResetPasswordNewPasswordErrorMessage = (state: RootState) => state.resetPasswordForm.newPasswordErrorMessage;
export const selectResetPasswordTokenInput = (state: RootState) => state.resetPasswordForm.token;
export const selectResetPasswordTokenInputErrorMessage = (state: RootState) => state.resetPasswordForm.tokenErrorMessage;
export const resetPasswordPageAvailability = (state: RootState) => state.resetPasswordForm.isAvailable;
export const serverResponseErrorMessage = (state: RootState) => state.resetPasswordForm.serverResponseErrorMessage;