import {store} from '../store/store';
import {TWsActions} from '../middleware/websocketMiddleware';
import {
  changeUserData,
  getUserData,
  logoutUser,
  profileSlice,
  ProfileWebsocketActions,
  refreshAccessToken,
  setLogin,
  setLoginInputError,
  setNameInputError,
  setPassword, setPasswordInputError, setProfilePageAvailable,
} from './profile-slice';
import {TUserData} from '../../utils/types';
import {connectWebSocket, disconnectWebSocket} from './feed-slice';
import {checkAuthToken} from '../../utils/api';


describe('Profile Reducers', () => {
  it('should handle setProfileName', () => {
    const newName = 'John Doe';
    store.dispatch(profileSlice.actions.setProfileName(newName));
    const updatedState = store.getState().profilePage;
    expect(updatedState.name).toEqual(newName);
  });

  // Add similar tests for other reducers

  // Async thunk tests
  it('should refresh access token', async () => {
    const dispatch = store.dispatch as jest.Mock;
    await dispatch(refreshAccessToken());
  });

  it('should logout user', async () => {
    const dispatch = store.dispatch as jest.Mock;
    await dispatch(logoutUser());
  });

  it('should change user data', async () => {
    const dispatch = store.dispatch as jest.Mock;
    const userData: TUserData = {name: 'New Name',
      email: 'new.email@example.com',
      password: ''};
    await dispatch(changeUserData(userData));
  });

  it('should get user data', async () => {
    const dispatch = store.dispatch as jest.Mock;
    await dispatch(getUserData());
  });

  // WebSocket action test
  it('should handle WebSocket actions', () => {
    const dispatch = store.dispatch as jest.Mock;
    dispatch(ProfileWebsocketActions as TWsActions);
  });
  it('should handle setNameInputError', () => {
    const error = 'Invalid name';
    store.dispatch(setNameInputError(error));
    const updatedState = store.getState().profilePage;
    expect(updatedState.nameInputError).toEqual(error);
  });
  it('should handle setLogin', () => {
    const newLogin = 'new@example.com';
    store.dispatch(setLogin(newLogin));
    const updatedState = store.getState().profilePage;
    expect(updatedState.login).toEqual(newLogin);
  });
  it('should handle setLoginInputError', () => {
    const error = 'Invalid login';
    store.dispatch(setLoginInputError(error));
    const updatedState = store.getState().profilePage;
    expect(updatedState.loginInputError).toEqual(error);
  });
  it('should handle setPassword', () => {
    const newPassword = 'newpassword123';
    store.dispatch(setPassword(newPassword));
    const updatedState = store.getState().profilePage;
    expect(updatedState.password).toEqual(newPassword);
  });
  it('should handle setPasswordInputError', () => {
    const error = 'Invalid password';
    store.dispatch(setPasswordInputError(error));
    const updatedState = store.getState().profilePage;
    expect(updatedState.passwordInputError).toEqual(error);
  });
});
