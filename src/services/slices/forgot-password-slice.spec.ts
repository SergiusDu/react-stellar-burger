import {
  forgotPasswordFormSlice,
  forgotPasswordFormSliceInitialState,
  selectForgotPasswordEmailInput,
  selectForgotPasswordEmailInputError,
  setForgotPasswordEmailInput,
  setForgotPasswordEmailInputError,
} from './forgot-password-slice';
import {
  createMockStore,
  mockedInitialState,
  mockedState,
} from '../../utils/mockStore';

jest.mock('../../utils/api', () => (
  {
    fetchAPI: jest.fn().mockResolvedValueOnce({
      success: true,
      message: 'Reset email sent',
    }),
  }
));
describe('forgotPasswordFormSlice reducers and selectors', () => {
  // Тесты для редьюсеров
  it('should handle setForgotPasswordEmailInput', () => {
    const testEmail = 'test@example.com';
    const action = setForgotPasswordEmailInput(testEmail);
    const state = forgotPasswordFormSlice.reducer(
      forgotPasswordFormSliceInitialState, action);
    expect(state.emailInputValue).toEqual(testEmail);
  });

  it('should handle setForgotPasswordEmailInputError', () => {
    const testError = 'Invalid email';
    const action = setForgotPasswordEmailInputError(testError);
    const state = forgotPasswordFormSlice.reducer(
      forgotPasswordFormSliceInitialState, action);
    expect(state.emailInputError).toEqual(testError);
  });
  // Тесты для селекторов
  it('should select the correct email input value', () => {
    const emailValue = 'test@example.com';
    const store = createMockStore({
      forgotPasswordForm: {
        ...forgotPasswordFormSliceInitialState,
        emailInputValue: emailValue // Исправлено на emailInputValue
      }
    });
    const state = store.getState();
    expect(selectForgotPasswordEmailInput(state)).toEqual(emailValue);
  });
  it('should select the correct email input error', () => {
    const emailError = 'Invalid email';
    const store = createMockStore({
      forgotPasswordForm: {
        ...forgotPasswordFormSliceInitialState,
        emailInputError: emailError
      }
    });
    const state = store.getState();
    expect(selectForgotPasswordEmailInputError(state)).toEqual(emailError);
  });
});
