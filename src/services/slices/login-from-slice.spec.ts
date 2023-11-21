// loginSlice.spec.ts
import store, {RootState} from '../store/store';

import {
  ACCESS_TOKEN_NAME, LOGIN_ENDPOINT, REFRESH_TOKEN_NAME,
} from '../../utils/constants';
import {
  authorizeUser,
  loginEmailInputErrorMessage,
  loginEmailInputValue,
  loginPasswordInputValue,
  loginSlice, loginSliceInitialState,
  redirectAfterLoginSuccess,
  setLoginEmailInputError,
  setLoginEmailInputValue,
  setLoginPasswordInputValue,
  setRedirectAfterLogin,
} from './login-form-slice';
import * as apiModule from '../../utils/api';
import {fetchAPI} from '../../utils/api';
import mocked = jest.mocked;
import {createMockStore, mockedState} from '../../utils/mockStore';

jest.mock('../../utils/api');

describe('loginSlice reducer and actions', () => {
  it('should handle setLoginEmailInputValue', () => {
    const testEmail = 'test@example.com';
    const action = {
      type: setLoginEmailInputValue.type,
      payload: testEmail,
    };
    const state = loginSlice.reducer(loginSliceInitialState, action);
    expect(state.email).toBe(testEmail);
  });
  it('should handle setLoginEmailInputError', () => {
    const testErrorMessage = 'Invalid email';
    const action = {
      type: setLoginEmailInputError.type,
      payload: testErrorMessage,
    };
    const state = loginSlice.reducer(loginSliceInitialState, action);
    expect(state.emailErrorMessage).toBe(testErrorMessage);
  });
  it('should handle setLoginPasswordInputValue', () => {
    const testPassword = 'password123';
    const action = {
      type: setLoginPasswordInputValue.type,
      payload: testPassword,
    };
    const state = loginSlice.reducer(loginSliceInitialState, action);
    expect(state.password).toBe(testPassword);
  });
  it('should handle setRedirectAfterLogin', () => {
    const redirectUrl = '/dashboard';
    const action = {
      type: setRedirectAfterLogin.type,
      payload: redirectUrl,
    };
    const state = loginSlice.reducer(loginSliceInitialState, action);
    expect(state.redirectAfterLogin).toBe(redirectUrl);
  });

  it('should return the initial state on first run', () => {
    expect(loginSlice.reducer(undefined, {type: ''})).toEqual(loginSliceInitialState);
  });

  describe('authorizeUser async action', () => {
    it('should handle successful authorization', async () => {
      const mockResponse = {
        success: true,
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };
      mocked(fetchAPI).mockResolvedValue(mockResponse); // Используем
      // мок-функцию
      const result = await store.dispatch(authorizeUser({
        email: 'test@example.com',
        password: 'password',
      }));

      expect(apiModule.fetchAPI).toHaveBeenCalledWith(LOGIN_ENDPOINT, 'POST', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(result.type).toBe('login/sendAuthorization/fulfilled');
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        ACCESS_TOKEN_NAME, mockResponse.accessToken, 20 * 60);
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        REFRESH_TOKEN_NAME, mockResponse.refreshToken, 60 * 60 * 2);
    });

    it('should handle failed authorization', async () => {
      const errorResponse = {
        success: false,
        message: 'Invalid credentials',
      };
      (
        fetchAPI as jest.Mock
      ).mockRejectedValue(errorResponse);
      const result = await store.dispatch(authorizeUser({
        email: 'test@example.com',
        password: 'wrongpassword',
      }));
      expect(result.type).toBe('login/sendAuthorization/rejected');
    });
  });
});

describe('loginFormSlice selectors', () => {
  it('loginEmailInputValue should return the email input value', () => {
    const email = 'test@example.com';
    const store = createMockStore({
      loginData: {
        ...loginSliceInitialState,
        email: email
      }
    });
    const state = store.getState();
    expect(loginEmailInputValue(state)).toEqual(email);
  });

  it('loginEmailInputErrorMessage should return the email input error message', () => {
    const errorMessage = 'Invalid email';
    const store = createMockStore({
      loginData: {
        ...loginSliceInitialState,
        emailErrorMessage: errorMessage
      }
    });
    const state = store.getState();
    expect(loginEmailInputErrorMessage(state)).toEqual(errorMessage);
  });

  it('loginPasswordInputValue should return the password input value', () => {
    const password = 'password123';
    const store = createMockStore({
      loginData: {
        ...loginSliceInitialState,
        password: password
      }
    });
    const state = store.getState();
    expect(loginPasswordInputValue(state)).toEqual(password);
  });

  it('redirectAfterLoginSuccess should return the redirect URL after login', () => {
    const redirectUrl = '/dashboard';
    const store = createMockStore({
      loginData: {
        ...loginSliceInitialState,
        redirectAfterLogin: redirectUrl
      }
    });
    const state = store.getState();
    expect(redirectAfterLoginSuccess(state)).toBe(redirectUrl);
  });
});
