// resetPasswordFormSlice.spec.ts
import store, {RootState} from '../store/store';
import {fetchAPI} from '../../utils/api';

import {RESET_PASSWORD_STEP_TWO_ENDPOINT} from '../../utils/constants';
import {resetPassword, resetPasswordFormSlice} from './reset-password-slice';
import mocked = jest.mocked;

jest.mock('../../utils/api');
jest.mock(
  '../../utils/constants', () => (
    {
      ...jest.requireActual(
        '../../utils/constants'), RESET_PASSWORD_STEP_TWO_ENDPOINT: '/reset-password-step-two',
    }
  ));

describe('resetPasswordFormSlice reducer and actions', () => {
  const initialState: RootState['resetPasswordForm'] = {
    newPassword: '', newPasswordErrorMessage: '', token: '', tokenErrorMessage: '', serverResponseErrorMessage: '', isAvailable: false,
  };

  it('should return the initial state on first run', () => {
    expect(resetPasswordFormSlice.reducer(undefined, {type: ''})).toEqual(
      initialState);
  });

  // Тесты для асинхронных действий
  describe('resetPassword async action', () => {
    it('should handle successful reset', async () => {
      const mockResponse = {
        success: true, payload: {
          message: 'Password reset' + ' successfully',
        },
      };
      mocked(fetchAPI).mockResolvedValue(mockResponse);
      const result = await store.dispatch(
        resetPassword({password: 'newPassword123', token: 'token123'}));
      expect(fetchAPI).toHaveBeenCalledWith(
        RESET_PASSWORD_STEP_TWO_ENDPOINT, 'POST',
        {password: 'newPassword123', token: 'token123'},
      );
      expect(result.type).toBe('resetPasswordForm/reset-password/fulfilled');
    });

  });

});
