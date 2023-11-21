// mockStore.ts
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import thunk from 'redux-thunk';
import {RootState, store} from '../services/store/store';
import {ingredientSliceInitialState} from '../services/slices/ingredient-slice';
import {
  BurgerConstructorSliceInitialState,
} from '../services/slices/burger-constructor-slice';
import {
  orderDetailsSliceInitialState,
} from '../services/slices/order-details-slice';
import {loginSliceInitialState,
} from '../services/slices/login-form-slice';
import {registrationSliceInitialState,
} from '../services/slices/registration-form-slice';
import {forgotPasswordFormSliceInitialState,
} from '../services/slices/forgot-password-slice';
import {resetPasswordFormSliceInitialState,
} from '../services/slices/reset-password-slice';
import {profileSliceInitialState,
} from '../services/slices/profile-slice';
import { feedSliceInitialState} from '../services/slices/feed-slice';

const middlewares = [thunk];

export const mockedInitialState: RootState = {
  ingredient: {
    ...ingredientSliceInitialState,
  }, burgerConstructor: {
    ...BurgerConstructorSliceInitialState,
  }, orderDetails: {
    ...orderDetailsSliceInitialState,
  }, loginData: {...loginSliceInitialState}, registrationFormData: {...registrationSliceInitialState}, forgotPasswordForm: {...forgotPasswordFormSliceInitialState}, resetPasswordForm: {...resetPasswordFormSliceInitialState}, profilePage: {...profileSliceInitialState}, feedSlice: {...feedSliceInitialState},
};

const mockStore = configureMockStore<RootState>(middlewares);

export function createMockStore(customState: Partial<RootState> = {}) {
  return mockStore({
    ...mockedInitialState, ...customState,
  });
}

export let mockedStore =  createMockStore({
});
export const mockedState = mockedStore.getState();