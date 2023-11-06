import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI from '../../utils/api';
import {RESET_PASSWORD_ENDPOINT} from '../../utils/constants';
import {EmailString} from '../../utils/types';
import {RootState} from '../store/store';

/**
 * Асинхронный экшен для отправки запроса на сброс пароля.
 */
export const sendResetPasswordEmail = createAsyncThunk('resetPasswordForm/reset-password',
  async (emailString: EmailString, {rejectWithValue}) => {
    try {
      const emailData = {
        email: emailString,
      };
      const response = await fetchAPI(RESET_PASSWORD_ENDPOINT, 'POST', emailData);
      if (response && response.success) {
        return response;
      } else {
        console.log(`Ошибка в регистрации пользователя: ${response.message}`);
        return rejectWithValue(response);
      }
    } catch (error: any) {
      console.error(`Произошла ошибка: ${error}`);
      return rejectWithValue(error.message || 'Unknown error');
    }
  });

interface ForgotPasswordSliceState {
  emailInputValue: string;
  emailInputError: string;
}
/**
 * Срез (slice) для формы восстановления пароля.
 */
const initialState: ForgotPasswordSliceState = {
  emailInputValue: '', emailInputError: '',
};
export const forgotPasswordFormSlice = createSlice({
  name: 'forgotPasswordForm', initialState, reducers: {
    setForgotPasswordEmailInput(state, action) {
      state.emailInputValue = action.payload;
    }, setForgotPasswordEmailInputError(state, action) {
      state.emailInputError = action.payload;
    },
  },
});

export const {
  setForgotPasswordEmailInput, setForgotPasswordEmailInputError,
} = forgotPasswordFormSlice.actions;

export const selectForgotPasswordEmailInput = (state: RootState) => state.forgotPasswordForm.emailInputValue;
export const selectForgotPasswordEmailInputError = (state: RootState) => state.forgotPasswordForm.emailInputError;