import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {
    checkAuthToken,
    clearCookies,
    deleteCookie,
    getAccessTokenFromCookies,
    getRefreshTokenFromCookies,
    saveAccessTokenInCookies,
    saveRefreshTokenInCookies,
} from '../../utils/api';
import {
    ACCESS_TOKEN_NAME,
    CHANGE_USER_DATA_ENDPOINT,
    GET_METHOD,
    GET_USER_DATA_ENDPOINT,
    LOGOUT_URL,
    PATCH_METHOD,
    POST_METHOD,
    REFRESH_TOKEN_ENDPOINT,
    REFRESH_TOKEN_NAME,
} from '../../utils/constants';


export const refreshAccessToken = createAsyncThunk('profile/refreshAccessToken', async (args, {
    rejectWithValue,
}) => {
    const refreshToken = getRefreshTokenFromCookies();
    if (!refreshToken) {
        return rejectWithValue('No refresh token available.');
    }
    try {
        const headers = {token: refreshToken};
        const response = await fetchAPI(REFRESH_TOKEN_ENDPOINT, POST_METHOD, headers);
        if (response && response.success) {
            saveAccessTokenInCookies(response.accessToken);
            saveRefreshTokenInCookies(response.refreshToken);
            return response.accessToken; // Возвращаем новый accessToken
        } else {
            const error = response?.message || 'Failed to refresh access token.';
            return rejectWithValue(error);
        }
    } catch (error) {
        clearCookies([ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME]);
        return rejectWithValue(error.message || 'An error occurred during fetching.');
    }
});
export const logoutUser = createAsyncThunk('profile/logoutUser', async () => {
    const refreshToken = getRefreshTokenFromCookies();
    if (refreshToken) {
        const bodyData = {
            token: refreshToken,
        };
        const response = await fetchAPI(LOGOUT_URL, POST_METHOD, bodyData, null);
        if (response && response.success) {
            deleteCookie(ACCESS_TOKEN_NAME);
            deleteCookie(REFRESH_TOKEN_NAME);
        }
    }
});
export const changeUserData = createAsyncThunk('profile/changeUserData', async (userData, {
    dispatch,
    rejectWithValue,
}) => {
    const accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
        return rejectWithValue('Access token is not available');
    }

    const sendRequestWithToken = async (token) => {
        try {
            const response = await fetchAPI(CHANGE_USER_DATA_ENDPOINT, PATCH_METHOD, userData, {Authorization: token});
            // Проверяем, что ответ содержит необходимые данные
            if (response.user && response.user.name && response.user.email) {
                return {
                    name: response.user.name,
                    login: response.user.email,
                };
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            // Если fetchAPI выбросил исключение, мы его здесь перехватываем
            if (error.name === 'AbortError') {
                return rejectWithValue('Request was aborted');
            }
            if (error.message === 'Failed to fetch') {
                return rejectWithValue('Network request failed');
            }
            // Перехватываем ошибку, если токен устарел
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                try {
                    // Попытка обновить токен
                    const newToken = await dispatch(refreshAccessToken()).unwrap();
                    // Повтор запроса с новым токеном
                    return await sendRequestWithToken(newToken);
                } catch (refreshError) {
                    // Если обновление токена не удалось разлогиниваемся и возвращаем ошибку
                    dispatch(logoutUser);
                    return rejectWithValue('Failed to refresh token');
                }
            }
            // Для остальных ошибок просто возвращаем сообщение
            return rejectWithValue(error.message);
        }
    };

    // Первая попытка отправить запрос с текущим токеном
    return sendRequestWithToken(accessToken);
});

export const getUserData = createAsyncThunk('profile/getUserData', async (args, {
    dispatch,
    rejectedWithValue,
}) => {
    const authToken = getAccessTokenFromCookies();
    try {
        const response = await fetchAPI(GET_USER_DATA_ENDPOINT, GET_METHOD, null, {Authorization: authToken});
        return {
            name: response.user.name,
            login: response.user.email,
        };
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            const newToken = await dispatch(refreshAccessToken()).unwrap();
            if (newToken) {
                const retryResponse = await fetchAPI(GET_USER_DATA_ENDPOINT, GET_METHOD, null, {Authorization: newToken});
                return {
                    name: retryResponse.user.name,
                    login: retryResponse.user.email,
                };
            }
        }
        return rejectedWithValue(error);
    }
});


export const profileSlice = createSlice({
    name: 'profilePage',
    initialState: {
        name: '',
        nameInputError: '',
        login: '',
        loginInputError: '',
        password: '',
        passwordInputError: '',
        isProfilePageAvailable: false,
    },
    reducers: {
        setProfileName(state, action) {
            state.name = action.payload;
        },
        setNameInputError(state, action) {
            state.nameInputError = action.payload;
        },
        setLogin(state, action) {
            state.login = action.payload;
        },
        setLoginInputError(state, action) {
            state.loginInputError = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        },
        setPasswordInputError(state, action) {
            state.passwordInputError = action.payload;
        },
        setProfilePageAvailable(state) {
            state.isProfilePageAvailable = checkAuthToken();
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.name = action.payload.name;
            state.login = action.payload.login;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.name = '';
            state.login = '';
            state.isProfilePageAvailable = false;
        });
        builder.addCase(changeUserData.fulfilled, (state, action) => {
            if (action.payload.user) {
                state.name = action.payload.name;
                state.login = action.payload.email;
            }
        });
    },
});
export const selectProfileName = state => state.profilePage.name;
export const selectProfileNameInputError = state => state.profilePage.nameInputError;
export const selectProfileLogin = state => state.profilePage.login;
export const selectProfileLoginInputError = state => state.profilePage.loginInputError;
export const selectProfilePassword = state => state.profilePage.password;
export const selectProfilePasswordInputError = state => state.profilePage.passwordInputError;
export const profilePageAvailability = state => state.profilePage.isProfilePageAvailable;
export const {
    setProfileName,
    setNameInputError,
    setLogin,
    setLoginInputError,
    setPassword,
    setPasswordInputError,
    setProfilePageAvailable,
} = profileSlice.actions;