import {
  ACCESS_TOKEN_LIFETIME,
  ACCESS_TOKEN_NAME, REFRESH_TOKEN_LIFETIME,
  REFRESH_TOKEN_NAME,
} from './constants';
import {refreshAccessToken} from '../services/slices/profile-slice';

async function fetchAPI(url, method, bodyData = null, headers = null) {
  const options = {
    method, headers: {
      'Content-Type': 'application/json', ...headers,
    },
  };
  if (bodyData) {
    options.body = JSON.stringify(bodyData);
  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data.data || data;
}

// TODO Улучшить
export function refreshTokensIfNeeded(dispatch) {
  const accessToken = getAccessTokenFromCookies();
  const refreshToken = getRefreshTokenFromCookies();
  if(!accessToken && refreshToken) {
    dispatch(refreshAccessToken());
  }
}
export function createUrlPathWithParams(baseUrl, params) {
  const searchParams = new URLSearchParams();

  // Добавление каждого параметра в строку запроса
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, value);
  }

  // Возвращение итогового URL с прикрепленными параметрами запроса
  return `${baseUrl}?${searchParams.toString()}`;
}
export function setCookie(cookieName, cookieValue, maxAge) {
  document.cookie = `${cookieName}=${cookieValue}; max-age=${maxAge};`
}
export function getAccessTokenFromCookies() {
  return getCookieByName(ACCESS_TOKEN_NAME);
}
export function getRefreshTokenFromCookies() {
  return getCookieByName(REFRESH_TOKEN_NAME);
}
export function saveAccessTokenInCookies(token) {
  setCookie(ACCESS_TOKEN_NAME, token, ACCESS_TOKEN_LIFETIME);
}
export function saveRefreshTokenInCookies(token) {
  setCookie(REFRESH_TOKEN_NAME, token, REFRESH_TOKEN_LIFETIME);
}

export function getCookieByName(cookieName) {
  const allCookies = document.cookie.split('; ');
  for (const cookieString of allCookies) {
    const [name, value] = cookieString.split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; max-age=0; path=/`;
}

export function checkAuthToken() {
  return !!getCookieByName('accessToken');
}

export default fetchAPI;