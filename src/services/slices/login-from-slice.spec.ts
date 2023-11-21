// loginSlice.spec.ts
import store, {RootState, testState} from '../store/store';

import {
  ACCESS_TOKEN_NAME, LOGIN_ENDPOINT, REFRESH_TOKEN_NAME,
} from '../../utils/constants';
import {
  authorizeUser,
  loginEmailInputErrorMessage,
  loginEmailInputValue,
  loginPasswordInputValue,
  loginSlice, redirectAfterLoginSuccess,
  setLoginEmailInputError,
  setLoginEmailInputValue,
  setLoginPasswordInputValue, setRedirectAfterLogin,
} from './login-form-slice';
import * as apiModule from '../../utils/api';
import {fetchAPI} from '../../utils/api';
import mocked = jest.mocked;

jest.mock('../../utils/api');

describe('loginSlice reducer and actions', () => {
  const initialState: RootState['loginData'] = {
    isLoading: false, email: '', emailErrorMessage: '', password: '', redirectAfterLogin: '/',
  };
  it('should handle setLoginEmailInputValue', () => {
    const testEmail = 'test@example.com';
    const action = { type: setLoginEmailInputValue.type, payload: testEmail };
    const state = loginSlice.reducer(initialState, action);
    expect(state.email).toBe(testEmail);
  });
  it('should handle setLoginEmailInputError', () => {
    const testErrorMessage = 'Invalid email';
    const action = { type: setLoginEmailInputError.type, payload: testErrorMessage };
    const state = loginSlice.reducer(initialState, action);
    expect(state.emailErrorMessage).toBe(testErrorMessage);
  });
  it('should handle setLoginPasswordInputValue', () => {
    const testPassword = 'password123';
    const action = { type: setLoginPasswordInputValue.type, payload: testPassword };
    const state = loginSlice.reducer(initialState, action);
    expect(state.password).toBe(testPassword);
  });
  it('should handle setRedirectAfterLogin', () => {
    const redirectUrl = '/dashboard';
    const action = { type: setRedirectAfterLogin.type, payload: redirectUrl };
    const state = loginSlice.reducer(initialState, action);
    expect(state.redirectAfterLogin).toBe(redirectUrl);
  });

  it('should return the initial state on first run', () => {
    expect(loginSlice.reducer(undefined, {type: ''})).toEqual(initialState);
  });

  describe('authorizeUser async action', () => {
    it('should handle successful authorization', async () => {
      const mockResponse = {
        success: true, accessToken: 'access-token', refreshToken: 'refresh-token',
      };
      mocked(fetchAPI).mockResolvedValue(mockResponse); // Используем
      // мок-функцию
      const result = await store.dispatch(authorizeUser({
        email: 'test@example.com', password: 'password',
      }));

      expect(apiModule.fetchAPI).toHaveBeenCalledWith(LOGIN_ENDPOINT, 'POST', {
        email: 'test@example.com', password: 'password',
      });
      expect(result.type).toBe('login/sendAuthorization/fulfilled');
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        ACCESS_TOKEN_NAME, mockResponse.accessToken, 20 * 60);
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        REFRESH_TOKEN_NAME, mockResponse.refreshToken, 60 * 60 * 2);
    });

    it('should handle failed authorization', async () => {
      const errorResponse = {
        success: false, message: 'Invalid credentials',
      };
      (
        fetchAPI as jest.Mock
      ).mockRejectedValue(errorResponse);
      const result = await store.dispatch(authorizeUser({
        email: 'test@example.com', password: 'wrongpassword',
      }));
      expect(result.type).toBe('login/sendAuthorization/rejected');
    });
  });
});

describe('loginSlice selectors', () => {
  it('loginEmailInputValue should return the email input value', () => {
    expect(loginEmailInputValue(testState)).toEqual(testState.loginData.email);
  });
  it('loginEmailInputErrorMessage should return the email input error message',
    () => {
      expect(loginEmailInputErrorMessage(testState)).toEqual(
        testState.loginData.emailErrorMessage);
    },
  );
  it('loginPasswordInputValue should return the password input value', () => {
    expect(loginPasswordInputValue(testState)).toEqual(
      testState.loginData.password);
  });
  it('redirectAfterLoginSuccess should return the redirect URL after login', () => {
    const customTestState = {
      ...testState,
      loginData: { ...testState.loginData, redirectAfterLogin: '/dashboard' }
    };
    expect(redirectAfterLoginSuccess(customTestState)).toBe('/dashboard');
  });

});
