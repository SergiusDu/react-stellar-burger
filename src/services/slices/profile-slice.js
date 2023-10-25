import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchAPI from "../../utils/api";

export const getUserData = createAsyncThunk('profile/getUserData', async (ags, {rejectedWithValue}) => {
    const getUserDataUrl = 'https://norma.nomoreparties.space/api/auth/user';
    const response = await fetchAPI(getUserDataUrl, 'GET');
});
export const profileSlice = createSlice({
    initialState: {
        name: '', nameInputError: '', login: '', loginInputError: '', password: '', passwordInputError: ''
    }, reducers: {
        setProfileName(state, action) {
            state.name = action.payload;
        }, setNameInputError(state, action) {
            state.nameInputError = action.payload;
        }, setLogin(state, action) {
            state.login = action.payload;
        }, setLoginInputError(state, action) {
            state.login = action.payload;
        }, setPassword(state, action) {
            state.password = action.payload;
        }, setPasswordInputError(state, action) {
            state.passwordInputError = action.payload;
        }
    }
});
export const selectProfileName = state => state.profilePage.name;
export const selectProfileNameInputError = state => state.profilePage.nameInputError;
export const selectProfileLogin = state => state.profilePage.login;
export const selectProfileLoginInputError = state => state.profilePage.loginInputError;
export const selectProfilePassword = state => state.profilePage.password;
export const selectProfilePasswordInputError = state => state.profilePage.passwordInputError;
export const {
    setProfileName, setNameInputError, setLogin, setLoginInputError, setPassword, setPasswordInputError
} = profileSlice.actions;