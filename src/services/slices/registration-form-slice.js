import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {setCookie} from '../../utils/api';
import {REGISTER_ENDPOINT} from '../../utils/constants';

export const registerUser = createAsyncThunk('registrationData/register-user', async (userCredentials, {rejectWithValue}) => {
    const response = await fetchAPI(REGISTER_ENDPOINT, 'POST', userCredentials);
    if (response.success) {
        return response;
    } else {
        console.log(`Ошибка в регистрации пользователя: ${response.message}`);
        return rejectWithValue(response.message);
    }
});
export const registrationSlice = createSlice({
    name: 'registrationData',
    initialState: {
        isLoaded: false,
        name: '',
        email: '',
        emailInputErrorMessage: '',
        password: '',
        responseErrorMessage: '',
        isFormBlocked: false,
    },
    reducers: {
        setNameInputValue(state, action) {
            state.name = action.payload;
        },
        setEmailInputValue(state, action) {
            state.email = action.payload;
        },
        setEmailInputErrorMessage(state, action) {
            state.emailInputErrorMessage = action.payload;
        },
        setPasswordInputValue(state, action) {
            state.password = action.payload;
        },
        setResponseErrorMessage(state, action) {
            state.responseErrorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isFormBlocked = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            setCookie('accessToken', action.payload.accessToken, 20 * 60, 'nomoreparties.space');
            setCookie('refreshToken', action.payload.refreshTocken, 20 * 60, 'nomoreparties.space');
            state.password = '';
            state.email = '';
            state.name = '';
            state.isFormBlocked = false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.responseErrorMessage = action.payload;
            state.isFormBlocked = false;
        });
    },
});

export const {
    setEmailInputValue,
    setEmailInputErrorMessage,
    setPasswordInputValue,
    setNameInputValue,
    setResponseErrorMessage,
} = registrationSlice.actions;
export const selectEmailInputValue = state => state.registrationFormData.email;
export const selectEmailInputErrorMessage = state => state.registrationFormData.emailInputErrorMessage;
export const selectPasswordInputValue = state => state.registrationFormData.password;
export const selectNameInputValue = state => state.registrationFormData.name;
export const responseErrorMessage = state => state.registrationFormData.responseErrorMessage;

export const isFormBlocked = state => state.registrationFormData.isFormBlocked;