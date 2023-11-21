// resetPasswordFormSlice.spec.ts
import store, {RootState} from '../store/store';
import {fetchAPI} from '../../utils/api';

import {RESET_PASSWORD_STEP_TWO_ENDPOINT} from '../../utils/constants';
import {
  resetPassword,
  resetPasswordFormSlice,
  setResetPasswordNewPasswordErrorMessage,
  setResetPasswordNewPasswordInput, setResetPasswordPageAvailability,
  setResetPasswordTokenInput, setServerResponseErrorMessage,
  setTokenErrorMessage,
} from './reset-password-slice';
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
  it('should handle setResetPasswordNewPasswordInput', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setResetPasswordNewPasswordInput('newPassword123')
    );
    expect(nextState.newPassword).toEqual('newPassword123');
  });

  it('should handle setResetPasswordNewPasswordErrorMessage', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setResetPasswordNewPasswordErrorMessage('Invalid password format')
    );
    expect(nextState.newPasswordErrorMessage).toEqual('Invalid password format');
  });

  it('should handle setResetPasswordTokenInput', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setResetPasswordTokenInput('token123')
    );
    expect(nextState.token).toEqual('token123');
  });

  it('should handle setTokenErrorMessage', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setTokenErrorMessage('Invalid token')
    );
    expect(nextState.tokenErrorMessage).toEqual('Invalid token');
  });

  it('should handle setResetPasswordPageAvailability', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setResetPasswordPageAvailability(true)
    );
    expect(nextState.isAvailable).toEqual(true);
  });

  it('should handle setServerResponseErrorMessage', () => {
    const nextState = resetPasswordFormSlice.reducer(
      initialState,
      setServerResponseErrorMessage('Server error')
    );
    expect(nextState.serverResponseErrorMessage).toEqual('Server error');
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
