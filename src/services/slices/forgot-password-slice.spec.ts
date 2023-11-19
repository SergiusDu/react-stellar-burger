import {
  forgotPasswordFormSlice,
  selectForgotPasswordEmailInput,
  selectForgotPasswordEmailInputError,
  sendResetPasswordEmail,
  setForgotPasswordEmailInput,
  setForgotPasswordEmailInputError,
} from './forgot-password-slice';
import fetchAPI from '../../utils/api';
import {sendResetPasswordEmailMock} from '../../utils/fetchApiMocs';
import * as apiModule from '../../utils/api';
import {Action, configureStore, Store} from '@reduxjs/toolkit';
import {ingredientSlice} from './ingredient-slice';
import {burgerConstructorSlice} from './burger-constructor-slice';
import {orderDetailsSlice} from './order-details-slice';
import {loginSlice} from './login-form-slice';
import {registrationSlice} from './registration-form-slice';
import {resetPasswordFormSlice} from './reset-password-slice';
import {profileSlice} from './profile-slice';
import {feedSlice} from './feed-slice';
import {AppDispatch, testState} from '../store/store';
let store: Store<any, Action> & { dispatch: AppDispatch };
jest.mock('../../utils/api', () => ({
  fetchAPI: jest.fn().mockResolvedValueOnce({
    success: true,
    message: "Reset email sent",
  }),
}));
describe('forgotPasswordFormSlice reducers and selectors', () => {
  const initialState = forgotPasswordFormSlice.getInitialState();
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredient: ingredientSlice.reducer,
        burgerConstructor: burgerConstructorSlice.reducer,
        orderDetails: orderDetailsSlice.reducer,
        loginData: loginSlice.reducer,
        registrationFormData: registrationSlice.reducer,
        forgotPasswordForm: forgotPasswordFormSlice.reducer,
        resetPasswordForm: resetPasswordFormSlice.reducer,
        profilePage: profileSlice.reducer,
        feedSlice: feedSlice.reducer,
      }
    });
  });

// Тесты для селекторов
it('should select the correct email input value', () => {
  const emailValue = 'test@example.com';
  const customTestState = {
    ...testState,
    forgotPasswordForm: {
      ...testState.forgotPasswordForm,
      emailInputValue: emailValue,
    },
  };
  expect(selectForgotPasswordEmailInput(customTestState)).toEqual(emailValue);
});

  // Тесты для редьюсеров
  it('should handle setForgotPasswordEmailInput', () => {
    const testEmail = 'test@example.com';
    const action = setForgotPasswordEmailInput(testEmail);
    const state = forgotPasswordFormSlice.reducer(initialState, action);
    expect(state.emailInputValue).toEqual(testEmail);
  });

  it('should handle setForgotPasswordEmailInputError', () => {
    const testError = 'Invalid email';
    const action = setForgotPasswordEmailInputError(testError);
    const state = forgotPasswordFormSlice.reducer(initialState, action);
    expect(state.emailInputError).toEqual(testError);
  });
it('should select the correct email input error', () => {
  const emailError = 'Invalid email';
  const customTestState = {
    ...testState,
    forgotPasswordForm: {
      ...testState.forgotPasswordForm,
      emailInputError: emailError,
    },
  };
  expect(selectForgotPasswordEmailInputError(customTestState)).toEqual(
    emailError);
});
})

