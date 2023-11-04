export const POST_METHOD: string  = 'POST';
export const GET_METHOD: string   = 'GET';
export const PATCH_METHOD: string = 'PATCH';

export const DOMAIN: string                           = 'norma.nomoreparties.space';
export const BASE_URL: string                         = `https://${DOMAIN}/api`;
export const ORDER_URL: string                        = `${BASE_URL}/orders`;
export const GET_USER_DATA_ENDPOINT: string           = `${BASE_URL}/auth/user`;
export const MAIN_PAGE_PATH: string                   = '/';
export const PROFILE_PAGE_PATH: string                = '/profile';
export const ORDER_LIST_PAGE_PATH: string             = '/order-list';
export const REGISTER_PAGE_PATH: string               = '/register';
export const LOGIN_PAGE_PATH: string                  = '/login';
export const FORGOT_PASSWORD_PAGE_PATH: string        = '/forgot-password';
export const RESET_PASSWORD_PAGE_PATH: string         = '/reset-password';
export const INGREDIENT_BY_ID_PAGE_PATH: string       = '/ingredient/:id';
export const ACCESS_TOKEN_NAME: string                = 'accessToken';
export const ACCESS_TOKEN_LIFETIME: number            = 20
                                                        * 60; // in seconds
export const REFRESH_TOKEN_NAME: string               = 'refreshToken';
export const REFRESH_TOKEN_LIFETIME: number           = 60
                                                        * 60
                                                        * 2; // in seconds
export const LOGOUT_URL: string                       = `${BASE_URL}/auth/logout`;
export const REFRESH_TOKEN_ENDPOINT: string           = `${BASE_URL}/auth/token`;
export const CHANGE_USER_DATA_ENDPOINT: string        = `${BASE_URL}/auth/user`;
export const LOGIN_ENDPOINT: string                   = `${BASE_URL}/auth/login`;
export const RESET_PASSWORD_ENDPOINT: string          = `${BASE_URL}/password-reset/`;
export const RESET_PASSWORD_STEP_TWO_ENDPOINT: string = `${BASE_URL}/password-reset/reset`;
export const REGISTER_ENDPOINT: string                = `${BASE_URL}/auth/register`;
