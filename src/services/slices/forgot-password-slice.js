import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchAPI from "../../utils/api";
import {RESET_PASSWORD_ENDPOINT} from '../../utils/constants';

export const sendResetPasswordEmail = createAsyncThunk(
  'resetPasswordForm/reset-password',
  async (emailString, {rejectWithValue}) => {
    try {
      const emailData  = {
        email: emailString
      }
      const response     = await fetchAPI(
        RESET_PASSWORD_ENDPOINT,
        'POST',
        emailData
      );
      if (response && response.success) {
        return response;
      }
      else {
        console.log(`Ошибка в регистрации пользователя: ${response.message}`)
        return rejectWithValue(response);
      }
    }
    catch (error) {
      console.error(`Произошла ошибка: ${error}`);
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const forgotPasswordFormSlice = createSlice({
                                                     name:         'forgotPasswordForm',
                                                     initialState: {
                                                       emailInputValue: '',
                                                       emailInputError: '',
                                                     },
                                                     reducers:     {
                                                       setForgotPasswordEmailInput(state, action) {
                                                         state.emailInputValue = action.payload;
                                                       },
                                                       setForgotPasswordEmailInputError(state, action) {
                                                         state.emailInputError = action.payload;
                                                       }
                                                     }
                                                   })

export const {
               setForgotPasswordEmailInput,
               setForgotPasswordEmailInputError
             } = forgotPasswordFormSlice.actions;

export const selectForgotPasswordEmailInput      = state => state.forgotPasswordForm.emailInputValue;
export const selectForgotPasswordEmailInputError = state => state.forgotPasswordForm.emailInputError;