import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {setCookie} from '../../utils/api';
import {ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME, REGISTER_ENDPOINT} from '../../utils/constants';
import {RootState} from '../store/store';
import {TUserData} from '../../utils/types';

export const registerUser = createAsyncThunk<RegistrationResponse, TUserData, { rejectValue: string }>('registrationData/register-user', async (
  userCredentials,
  {rejectWithValue},
) => {
  const response = await fetchAPI(REGISTER_ENDPOINT, 'POST', userCredentials);
  if (response.success) {
    return response;
  } else {
    console.log(`Ошибка в регистрации пользователя: ${response.message}`);
    return rejectWithValue(response.message);
  }
});
interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}
interface RegistrationState {
  isLoaded: boolean;
  name: string;
  email: string;
  emailInputErrorMessage: string;
  password: string;
  responseErrorMessage: string;
  isFormBlocked: boolean;
}
const initialState : RegistrationState = {
  isLoaded: false, name: '', email: '', emailInputErrorMessage: '', password: '', responseErrorMessage: '', isFormBlocked: false,
};
export const registrationSlice = createSlice({
  name: 'registrationData', initialState, reducers: {
    setNameInputValue(
      state,
      action,
    ) {
      state.name = action.payload;
    }, setEmailInputValue(
      state,
      action,
    ) {
      state.email = action.payload;
    }, setEmailInputErrorMessage(
      state,
      action,
    ) {
      state.emailInputErrorMessage = action.payload;
    }, setPasswordInputValue(
      state,
      action,
    ) {
      state.password = action.payload;
    }, setResponseErrorMessage(
      state,
      action,
    ) {
      state.responseErrorMessage = action.payload;
    },
  }, extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isFormBlocked = true;
    }).addCase(registerUser.fulfilled, (
      state,
      action,
    ) => {
      setCookie('accessToken', action.payload.accessToken, ACCESS_TOKEN_LIFETIME);
      setCookie('refreshToken', action.payload.refreshToken, REFRESH_TOKEN_LIFETIME);
      state.password = '';
      state.email = '';
      state.name = '';
      state.isFormBlocked = false;
    }).addCase(registerUser.rejected, (
      state,
      action,
    ) => {
      if(action?.payload) {
        state.responseErrorMessage = action.payload;
      }
      state.isFormBlocked = false;
    });
  },
});

export const {
  setEmailInputValue, setEmailInputErrorMessage, setPasswordInputValue, setNameInputValue, setResponseErrorMessage,
} = registrationSlice.actions;
export const selectEmailInputValue = (state : RootState) => state.registrationFormData.email;
export const selectEmailInputErrorMessage = (state : RootState) => state.registrationFormData.emailInputErrorMessage;
export const selectPasswordInputValue = (state : RootState) => state.registrationFormData.password;
export const selectNameInputValue = (state : RootState) => state.registrationFormData.name;
export const responseErrorMessage = (state : RootState) => state.registrationFormData.responseErrorMessage;

export const isFormBlocked = (state : RootState) => state.registrationFormData.isFormBlocked;