import {BASE_URL} from './types';

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';
export const PATCH_METHOD = 'PATCH';

export const DOMAIN = 'norma.nomoreparties.space';
export const BASE_URL = `https://${DOMAIN}/api`;
export const ORDER_URL = `${BASE_URL}/orders`
export const MAIN_PAGE_PATH = '/'
export const PROFILE_PAGE_PATH = '/profile';
export const ORDER_LIST_PAGE_PATH = 'order-list';
export const REGISTER_PAGE_PATH = '/register';
export const LOGIN_PAGE_PATH = '/login';
export const FORGOT_PASSWORD_PAGE_PATH = '/forgot-password';
export const RESET_PASSWORD_PAGE_PATH = '/reset-password';
export const INGREDIENT_BY_ID_PAGE_PATH = `/ingredient/:id`;
export const ACCESS_TOKEN_NAME = 'accessToken';
export const ACCESS_TOKEN_LIFETIME = 20*20*60;
export const REFRESH_TOKEN_NAME = 'refreshToken';
export const REFRESH_TOKEN_LIFETIME = 60*60*2;
export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
export const REFRESH_TOKEN_ENDPOINT = 'https://norma.nomoreparties.space/api/auth/token';
export const CHANGE_USER_DATA_ENDPOINT = 'https://norma.nomoreparties.space/api/auth/user';