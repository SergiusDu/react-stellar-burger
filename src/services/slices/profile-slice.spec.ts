
import {RootState, store, testState} from '../store/store';
import { configureStore } from '@reduxjs/toolkit';
import { TWsActions } from '../middleware/websocketMiddleware';
import {
  changeUserData, getUserData,
  logoutUser,
  profileSlice, ProfileWebsocketActions,
  refreshAccessToken,
} from './profile-slice';
import {ingredientSlice} from './ingredient-slice';
import {burgerConstructorSlice} from './burger-constructor-slice';
import {orderDetailsSlice} from './order-details-slice';
import {loginSlice} from './login-form-slice';
import {registrationSlice} from './registration-form-slice';
import {forgotPasswordFormSlice} from './forgot-password-slice';
import {resetPasswordFormSlice} from './reset-password-slice';
import {feedSlice} from './feed-slice';
import {TUserData} from '../../utils/types';

// Mock API functions if needed
jest.mock('../../utils/api', () => ({
  // Mock your API functions here
}));

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
    const updatedState = store.getState().profilePage;
    // Add assertions for the state after refreshing access token
  });

  it('should logout user', async () => {
    const dispatch = store.dispatch as jest.Mock;
    await dispatch(logoutUser());
    const updatedState = store.getState().profilePage;
    // Add assertions for the state after logging out
  });

  it('should change user data', async () => {
    const dispatch = store.dispatch as jest.Mock;
    const userData: TUserData = { name: 'New Name', email: 'new.email@example.com', password: '' };
    await dispatch(changeUserData(userData));
    const updatedState = store.getState().profilePage;
    // Add assertions for the state after changing user data
  });

  it('should get user data', async () => {
    const dispatch = store.dispatch as jest.Mock;
    await dispatch(getUserData());
    const updatedState = store.getState().profilePage;
    // Add assertions for the state after getting user data
  });

  // WebSocket action test
  it('should handle WebSocket actions', () => {
    const dispatch = store.dispatch as jest.Mock;
    dispatch(ProfileWebsocketActions as TWsActions);
    const updatedState = store.getState().profilePage;
    // Add assertions for the state after handling WebSocket actions
  });
});
