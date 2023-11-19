// registrationSlice.spec.ts
import store, { RootState } from '../store/store';
import {fetchAPI, setCookie } from '../../utils/api';
import { REGISTER_ENDPOINT } from '../../utils/constants';
import mocked = jest.mocked;
import {
  registerUser,
  registrationSlice,
  selectEmailInputValue,
} from './registration-form-slice';
import {TUserData} from '../../utils/types';

jest.mock('../../utils/api');
jest.mock('../../utils/constants', () => ({
  ...jest.requireActual('../../utils/constants'),
  REGISTER_ENDPOINT: '/register',
}));

describe('registrationSlice reducer and actions', () => {
  const initialState: RootState['registrationFormData'] = {
    isLoaded: false,
    name: '',
    email: '',
    emailInputErrorMessage: '',
    password: '',
    responseErrorMessage: '',
    isFormBlocked: false,
  };

  it('should return the initial state on first run', () => {
    expect(registrationSlice.reducer(undefined, {type: ''})).toEqual(
      initialState);
  });

  // Тесты для асинхронных действий
  describe('registerUser async action', () => {
    it('should handle successful registration', async () => {
      const mockResponse = {success: true, accessToken: 'access-token', refreshToken: 'refresh-token'};
      mocked(fetchAPI).mockResolvedValue(mockResponse);
      const userData: TUserData = { email: 'test@example.com', password: 'password123'}
      const result = await store.dispatch(registerUser(userData
        ));
      expect(fetchAPI).toHaveBeenCalledWith(
        REGISTER_ENDPOINT, 'POST',
        {email: 'test@example.com', password: 'password123'}
      );
      expect(result.type).toBe('registrationData/register-user/fulfilled');
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken', mockResponse.accessToken, expect.anything());
      expect(setCookie).toHaveBeenCalledWith(
        'refreshToken', mockResponse.refreshToken, expect.anything());
    });
  });

  // Тесты для редьюсеров
  describe('registrationSlice reducers', () => {
    it('should handle setEmailInputValue', () => {
      const nextState = registrationSlice.reducer(
        initialState,
        registrationSlice.actions.setEmailInputValue('test@example.com')
      );
      expect(nextState.email).toEqual('test@example.com');
    });

    // Другие тесты для редьюсеров
  });

});