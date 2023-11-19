// loginSlice.spec.ts
import store, {RootState, testState} from '../store/store';

import {
  ACCESS_TOKEN_NAME,
  LOGIN_ENDPOINT,
  REFRESH_TOKEN_NAME,
} from '../../utils/constants';
import {
  authorizeUser,
  loginEmailInputErrorMessage,
  loginEmailInputValue,
  loginPasswordInputValue,
  loginSlice,
} from './login-form-slice';
import * as apiModule from '../../utils/api';
import {fetchAPI} from '../../utils/api';
import mocked = jest.mocked;

jest.mock('../../utils/api');

describe('loginSlice reducer and actions', () => {
  const initialState: RootState['loginData'] = {
    isLoading: false, email: '', emailErrorMessage: '', password: '', redirectAfterLogin: '/',
  };

  it('should return the initial state on first run', () => {
    expect(loginSlice.reducer(undefined, {type: ''})).toEqual(initialState);
  });

  describe('authorizeUser async action', () => {
    it('should handle successful authorization', async () => {
      const mockResponse = {success: true, accessToken: 'access-token', refreshToken: 'refresh-token'};
      mocked(fetchAPI).mockResolvedValue(mockResponse); // Используем
      // мок-функцию
      const result = await store.dispatch(
        authorizeUser({email: 'test@example.com', password: 'password'}));

      expect(apiModule.fetchAPI).toHaveBeenCalledWith(
        LOGIN_ENDPOINT, 'POST',
        {email: 'test@example.com', password: 'password'},
      );
      expect(result.type).toBe('login/sendAuthorization/fulfilled');
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        ACCESS_TOKEN_NAME, mockResponse.accessToken, 20 * 60);
      expect(apiModule.setCookie).toHaveBeenCalledWith(
        REFRESH_TOKEN_NAME, mockResponse.refreshToken, 60 * 60 * 2);
    });

    it('should handle failed authorization', async () => {
      const errorResponse = {success: false, message: 'Invalid credentials'};
      (
        fetchAPI as jest.Mock
      ).mockRejectedValue(errorResponse);
      const result = await store.dispatch(
        authorizeUser({email: 'test@example.com', password: 'wrongpassword'}));
      expect(result.type).toBe('login/sendAuthorization/rejected');
      expect(result.payload).toEqual(errorResponse);
    });
  });

  // Добавьте тесты для других actions
  // ...
});

describe('loginSlice selectors', () => {
  it('loginEmailInputValue should return the email input value', () => {
    expect(loginEmailInputValue(testState)).toEqual(testState.loginData.email);
  });
  it(
    'loginEmailInputErrorMessage should return the email input error message',
    () => {
      expect(loginEmailInputErrorMessage(testState)).toEqual(
        testState.loginData.emailErrorMessage);
    },
  );
  it('loginPasswordInputValue should return the password input value', () => {
    expect(loginPasswordInputValue(testState)).toEqual(
      testState.loginData.password);
  });
});
