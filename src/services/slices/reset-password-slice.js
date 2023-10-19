import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchAPI from "../../utils/api";

export const resetPassword = createAsyncThunk('resetPasswordForm/reset-password', async (email, {rejectWithValue}) => {
  const registerUrl = 'https://norma.nomoreparties.space/api/password-reset/reset'
  const response = await fetchAPI(registerUrl, 'POST', email);
  if (response.success) {
    return response;
  } else {
    console.log(`Ошибка в регистрации пользователя: ${response.message}`)
    return rejectWithValue(response);
  }
});

export const resetPasswordFormSlice = createSlice({
  name: 'forgotPasswordForm',
  initialState: {
    newPassword: '', newPasswordErrorMessage: '', token: '', tokenErrorMessage: ''
  },
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
    }
  }
})

export const {setResetPasswordNewPasswordInput, setResetPasswordNewPasswordErrorMessage, setResetPasswordTokenInput, setTokenErrorMessage} = resetPasswordFormSlice.actions;

export const selectResetPasswordNewPasswordInput = state => state.resetPasswordForm.newPassword;
export const selectResetPasswordNewPasswordErrorMessage = state => state.resetPasswordForm.newPasswordErrorMessage;
export const selectResetPasswordTokenInput = state => state.resetPasswordForm.token;
export const selectResetPasswordTokenInputErrorMessage = state => state.resetPasswordForm.tokenErrorMessage;