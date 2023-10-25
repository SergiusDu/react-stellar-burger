import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/types";
import fetchAPI, {setCookie} from "../../utils/api";

export const authorizeUser = createAsyncThunk('login/sendAuthorization', async (userData, {rejectWithValue}) => {
    const response = await fetchAPI(`https://norma.nomoreparties.space/api/auth/login`, 'POST', userData);
    if (response.success) {
        return response;
    } else {
        console.log(`Ошибка в авторизации пользователя: ${response.message}`)
        return rejectWithValue(response);
    }
})

export const loginSlice = createSlice({
    name: 'loginData', initialState: {
        isLoading: false, email: '', emailErrorMessage: '', password: '',
    }, reducers: {
        setLoginEmailInputValue(state, action) {
            state.email = action.payload
        }, setLoginEmailInputError(state, action) {
            state.emailErrorMessage = action.payload;
        }, setLoginPasswordInputValue(state, action) {
            state.password = action.payload;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(authorizeUser.pending, (state) => {
            })
            .addCase(authorizeUser.fulfilled, (state, action) => {
                setCookie('accessToken', action.payload.accessToken, 20*60);
                setCookie('refreshToken', action.payload.refreshToken, 20*60);
                state.email = '';
                state.password = '';
            })
            .addCase(authorizeUser.rejected, (state, action) => {
            });
    }
});

export const {setLoginEmailInputValue, setLoginEmailInputError, setLoginPasswordInputValue} = loginSlice.actions;
export const loginEmailInputValue = state => state.loginData.email;
export const loginEmailInputErrorMessage = state => state.loginData.emailErrorMessage;
export const loginPasswordInputValue = state => state.loginData.password;