import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchAPI from "../../utils/api";

export const sendResetPasswordEmail = createAsyncThunk('resetPasswordForm/reset-password', async (email, {rejectWithValue}) => {
  const registerUrl = 'https://norma.nomoreparties.space/api/password-reset'
  const response = await fetchAPI(registerUrl, 'POST', email);
  if (response.success) {
    return response;
  } else {
    console.log(`Ошибка в регистрации пользователя: ${response.message}`)
    return rejectWithValue(response);
  }
});

export const forgotPasswordFormSlice = createSlice({
  name: 'forgotPasswordForm',
  initialState: {
    emailInputValue: '', emailInputError: '',
  },
  reducers: {
    setForgotPasswordEmailInput(state, action) {
      state.emailInputValue = action.payload;
    },
    setForgotPasswordEmailInputError(state, action) {
      state.emailInputError = action.payload;
    }
  }
})

export const {setForgotPasswordEmailInput, setForgotPasswordEmailInputError} = forgotPasswordFormSlice.actions;

export const selectForgotPasswordEmailInput = state => state.forgotPasswordForm.emailInputValue;
export const selectForgotPasswordEmailInputError = state => state.forgotPasswordForm.emailInputError;