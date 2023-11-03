import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {setCookie} from '../../utils/api';
import {ACCESS_TOKEN_NAME, LOGIN_ENDPOINT, REFRESH_TOKEN_NAME} from '../../utils/constants';

export const authorizeUser = createAsyncThunk('login/sendAuthorization', async (userData, {rejectWithValue}) => {
    const response = await fetchAPI(LOGIN_ENDPOINT, 'POST', userData);
    if (response.success) {
        return response;
    } else {
        console.log(`Ошибка в авторизации пользователя: ${response.message}`);
        return rejectWithValue(response);
    }
});

export const loginSlice = createSlice({
    name: 'loginData',
    initialState: {
        isLoading: false,
        email: '',
        emailErrorMessage: '',
        password: '',
        redirectAfterLogin: '/',
    },
    reducers: {
        setLoginEmailInputValue(state, action) {
            state.email = action.payload;
        },
        setLoginEmailInputError(state, action) {
            state.emailErrorMessage = action.payload;
        },
        setLoginPasswordInputValue(state, action) {
            state.password = action.payload;
        },
        setRedirectAfterLogin(state, action) {
            state.redirectAfterLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authorizeUser.pending, (state) => {
        }).addCase(authorizeUser.fulfilled, (state, action) => {
            setCookie(ACCESS_TOKEN_NAME, action.payload.accessToken, 20 * 60);
            setCookie(REFRESH_TOKEN_NAME, action.payload.refreshToken, 60 * 60 * 2);
            state.email = '';
            state.password = '';
        }).addCase(authorizeUser.rejected, (state, action) => {
        });
    },
});

export const {
    setLoginEmailInputValue,
    setLoginEmailInputError,
    setLoginPasswordInputValue,
    setRedirectAfterLogin,
} = loginSlice.actions;
export const loginEmailInputValue = state => state.loginData.email;
export const loginEmailInputErrorMessage = state => state.loginData.emailErrorMessage;
export const loginPasswordInputValue = state => state.loginData.password;
export const redirectAfterLoginSuccess = state => state.loginData.redirectAfterLogin;