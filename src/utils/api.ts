import {
  ACCESS_TOKEN_LIFETIME,
  ACCESS_TOKEN_NAME, GET_ORDERS_WS_ENDPOINT,
  REFRESH_TOKEN_LIFETIME,
  REFRESH_TOKEN_NAME,
} from './constants';
import {
  ProfileWebsocketActions,
  refreshAccessToken,
} from '../services/slices/profile-slice';
import {AppDispatch} from '../services/store/store';
import {HttpMethod, IngredientType, TNullableToken} from './types';
import {TWsActions} from '../services/middleware/websocketMiddleware';
import ingredient from '../components/burger-ingredients/ingredient/ingredient';

type BodyData = Record<string, any> | null;
type Headers = Record<string, string> | Record<string, TNullableToken> | null;

/**
 * Выполняет API запрос с использованием fetch.
 * @param url - URL адрес, по которому будет отправлен запрос.
 * @param method - HTTP метод для запроса.
 * @param bodyData - Необязательный объект с данными тела запроса.
 * @param headers - Необязательный объект с дополнительными заголовками запроса.
 * @returns Промис, разрешающийся в данные ответа.
 */
export async function fetchAPI(url: string,
  method: HttpMethod,
  bodyData: BodyData = null,
  headers: Headers = null,
): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json', ...headers,
    },
  };
  if (bodyData) {
    options.body = JSON.stringify(bodyData);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    return response.json();
  }
  const data = await response.json();
  return data.data || data;
}

/**
 * Проверяет, нужно ли обновить токены, и если нужно, диспатчит действие для их
 * обновления.
 * @param dispatch - Функция диспатча Redux.
 */
export async function refreshTokensIfNeeded(dispatch: AppDispatch) {
  const accessToken = getAccessTokenFromCookies();
  const refreshToken = getRefreshTokenFromCookies();
  if (!accessToken && refreshToken) {
    try {
      await dispatch(refreshAccessToken()).unwrap();
    }
    catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  }
}

/**
 * Создаёт URL с параметрами запроса.
 * @param baseUrl - Базовый URL, к которому будут добавлены параметры.
 * @param params - Объект с параметрами запроса.
 * @returns Полный URL с параметрами запроса.
 */
export function createUrlPathWithParams(
  baseUrl: string,
  params: Record<string, string>,
) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, value);
  }
  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Устанавливает куки.
 * @param cookieName - Название куки.
 * @param cookieValue - Значение куки.
 * @param maxAge - Максимальное время жизни куки в секундах.
 */
export function setCookie(
  cookieName: string,
  cookieValue: string,
  maxAge: number,
) {
  document.cookie = `${cookieName}=${cookieValue}; max-age=${maxAge};`;
}

/**
 * Получает токен доступа из куки.
 * @returns Токен доступа или null, если токен не найден.
 */
export function getAccessTokenFromCookies() {
  return getCookieByName(ACCESS_TOKEN_NAME);
}

/**
 * Получает токен обновления из куки.
 * @returns Токен обновления или null, если токен не найден.
 */
export function getRefreshTokenFromCookies() {
  return getCookieByName(REFRESH_TOKEN_NAME);
}

/**
 * Сохраняет токен доступа в куки.
 * @param token - Токен доступа для сохранения.
 */
export function saveAccessTokenInCookies(token: string) {
  setCookie(ACCESS_TOKEN_NAME, token, ACCESS_TOKEN_LIFETIME);
}

/**
 * Сохраняет токен обновления в куки.
 * @param token - Токен обновления для сохранения.
 */
export function saveRefreshTokenInCookies(token: string) {
  setCookie(REFRESH_TOKEN_NAME, token, REFRESH_TOKEN_LIFETIME);
}

/**
 * Получает значение куки по названию.
 * @param cookieName - Название куки, значение которой нужно получить.
 * @returns Значение куки или null, если куки с таким названием не существует.
 */
export function getCookieByName(cookieName: string): TNullableToken {
  const allCookies = document.cookie.split('; ');
  for (const cookieString of allCookies) {
    const [name, value] = cookieString.split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

/**
 * Удаляет куки по названию.
 * @param cookieName - Название куки, которую нужно удалить.
 */
export function deleteCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; max-age=0; path=/`;
}

/**
 * Очищает все куки, перечисленные в массиве.
 * @param cookieNames - Массив названий куки, которые нужно очистить.
 */
export function clearCookies(cookieNames: string[]): void {
  cookieNames.forEach(cookieName => deleteCookie(cookieName));
}

/**
 * Проверяет наличие токена авторизации в куки.
 * @returns true, если токен авторизации существует, иначе false.
 */
export function checkAuthToken(): boolean {
  return !!getCookieByName('accessToken');
}

export function saveObjectInLocalStorage(
  objectName: string,
  object: Object,
) {
  localStorage.setItem(objectName, JSON.stringify(object));
}

export function getObjectFromLocalStorage(objectName: string): any {
  const item = localStorage.getItem(objectName);
  if (item === null) {
    return null;
  }
  return JSON.parse(item);
}

export function removeObjectFromLocalStorage(objectName: string): void {
  localStorage.removeItem(objectName);
}

export function isNonEmptyString(value: string | null): boolean {
  return value ? value.trim().length > 0 : false;
}

/**
 * Генерирует SHA-256 хеш токена с использованием Web Crypto API.
 * @param {string} token - Токен, который нужно захешировать.
 * @returns {Promise<string>} Хеш токена в виде шестнадцатеричной строки.
 */
export async function generateTokenHash(token: string): Promise<string> {
  // Кодируем токен в Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(token);

  // Используем Web Crypto API для генерации хеша SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Преобразуем ArrayBuffer хеша в строку шестнадцатеричных чисел
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

/**
 * Функция для подсчета количества уникальных идентификаторов в списке.
 * @param idList Список идентификаторов.
 * @returns Словарь с идентификаторами в качестве ключей и их количеством в
 *   качестве значений.
 */
export function getUniqueIdsWithCount(idList: string[]): Record<string, number> {
  const count: Record<string, number> = {};

  idList.forEach((id) => {
    if (count[id]) {
      count[id] += 1;
    }
    else {
      count[id] = 1;
    }
  });

  return count;
}

/**
 * Переводит статус заказа на русский язык.
 *
 * @param {string} status Статус заказа, который нужно перевести.
 * @returns {string} Переведенный статус заказа.
 * @throws {Error} Если статус заказа неизвестен.
 */
export function translateOrderStatus(status: string): string {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      throw new Error('Неизвестный статус заказа');
  }
}

/**
 * Создает объект действия WebSocket с обновленным URL.
 *
 * Эта функция принимает объект действия WebSocket и возвращает новый объект,
 * с обновленным URL, включающим токен доступа. Токен извлекается из куки.
 *
 * @returns {TWsActions} Новый объект действия WebSocket с обновленным URL.
 */
export function createWebSocketProfileOrdersAction(): TWsActions {
  // Предполагается, что GET_ORDERS_WS_ENDPOINT и getAccessTokenFromCookies() уже определены.
  const updatedUrl = GET_ORDERS_WS_ENDPOINT + '?token=' + getAccessTokenFromCookies()?.split(' ')[1];

  return {
    ...ProfileWebsocketActions,
    payload: {
      ...ProfileWebsocketActions.payload,
      url: updatedUrl,
    },
  };
}

/**
 * Возвращает случайный элемент из массива.
 * @param {Array} array - Массив, из которого нужно выбрать элемент.
 * @returns {any} Случайный элемент массива.
 */
export function getRandomElement<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
/**
 * Возвращает случайную булочку из массива ингредиентов.
 * @param {Array<IngredientType>} ingredients - Массив ингредиентов.
 * @returns {IngredientType} Случайная булочка.
 */
export function getRandomBun(ingredients: IngredientType[]): IngredientType {
  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  return getRandomElement(buns);
}

/**
 * Возвращает случайны ингридиент.
 * @param {Array<IngredientType>} ingredients - Массив ингредиентов.
 * @returns {IngredientType} Случайная ингридиент.
 */
export function getRandomBurgerIngredient(ingredients: IngredientType[]): IngredientType {
  const notBunIngredients = ingredients.filter(ingredient => ingredient.type !== 'bun');
  return getRandomElement(notBunIngredients);
}