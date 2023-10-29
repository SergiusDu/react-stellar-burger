import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import fetchAPI, {checkAuthToken, getCookieByName} from "../../utils/api";

export const getUserData = createAsyncThunk('profile/getUserData', async (ags, {rejectedWithValue}) => {
    const getUserDataUrl = 'https://norma.nomoreparties.space/api/auth/user';
    const authToken = getCookieByName('accessToken');
    if(authToken) {
        try {
            const response = await fetchAPI(getUserDataUrl, 'GET', null, {Authorization: authToken});
            return {name: response.user.name, login: response.user.email};
        } catch (error) {
            return rejectedWithValue(error);
        }

    }

});
export const profileSlice = createSlice({
    name: 'profilePage',
    initialState: {
        name: '', nameInputError: '', login: '', loginInputError: '', password: '', passwordInputError: '', isProfilePageAvailable: false
    }, reducers: {
        setProfileName(state, action) {
            state.name = action.payload;
        }, setNameInputError(state, action) {
            state.nameInputError = action.payload;
        }, setLogin(state, action) {
            state.login = action.payload;
        }, setLoginInputError(state, action) {
            state.loginInputError = action.payload;
        }, setPassword(state, action) {
            state.password = action.payload;
        }, setPasswordInputError(state, action) {
            state.passwordInputError = action.payload;
        },
        setProfilePageAvailable(state) {
            state.isProfilePageAvailable = checkAuthToken();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
              state.name = action.payload.name;
              state.login = action.payload.login;
            })
    }
});
export const selectProfileName = state => state.profilePage.name;
export const selectProfileNameInputError = state => state.profilePage.nameInputError;
export const selectProfileLogin = state => state.profilePage.login;
export const selectProfileLoginInputError = state => state.profilePage.loginInputError;
export const selectProfilePassword = state => state.profilePage.password;
export const selectProfilePasswordInputError = state => state.profilePage.passwordInputError;
export const profilePageAvailability = state => state.profilePage.isProfilePageAvailable;
export const {
    setProfileName, setNameInputError, setLogin, setLoginInputError, setPassword, setPasswordInputError
, setProfilePageAvailable} = profileSlice.actions;