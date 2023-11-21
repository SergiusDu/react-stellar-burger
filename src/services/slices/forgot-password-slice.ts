import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAPI} from '../../utils/api';
import {RESET_PASSWORD_ENDPOINT} from '../../utils/constants';
import {
  EmailString, IRejectedResponse, ISuccessResponse,
} from '../../utils/types';
import {RootState} from '../store/store';

/**
 * Асинхронный экшен для отправки запроса на сброс пароля.
 */
export const sendResetPasswordEmail = createAsyncThunk<ISuccessResponse, EmailString, {
  rejectValue: IRejectedResponse; state: RootState;
}>('resetPasswordForm/reset-password', async (
  emailString: EmailString,
  {rejectWithValue},
) => {
  const emailData = {
    email: emailString,
  };
  const response = await fetchAPI(RESET_PASSWORD_ENDPOINT, 'POST', emailData);
  return (
    await response
  ) as ISuccessResponse;
});

interface ForgotPasswordSliceState {
  emailInputValue: string;
  emailInputError: string;
}

/**
 * Срез (slice) для формы восстановления пароля.
 */
export const forgotPasswordFormSliceInitialState: ForgotPasswordSliceState = {
  emailInputValue: '', emailInputError: '',
};
export const forgotPasswordFormSlice = createSlice({
  name: 'forgotPasswordForm', initialState: forgotPasswordFormSliceInitialState, reducers: {
    setForgotPasswordEmailInput(
      state,
      action,
    ) {
      state.emailInputValue = action.payload;
    }, setForgotPasswordEmailInputError(
      state,
      action,
    ) {
      state.emailInputError = action.payload;
    },
  }, extraReducers: builder => {
    builder.addCase(
      sendResetPasswordEmail.fulfilled, (
        state,
        action,
      ) => {
      });
  },
});

export const {
  setForgotPasswordEmailInput, setForgotPasswordEmailInputError,
} = forgotPasswordFormSlice.actions;

export const selectForgotPasswordEmailInput = (state: RootState) => state.forgotPasswordForm.emailInputValue;
export const selectForgotPasswordEmailInputError = (state: RootState) => state.forgotPasswordForm.emailInputError;