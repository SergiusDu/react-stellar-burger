import {AnyAction} from 'redux';

export const BUN_TYPE = 'bun';
export const MAIN_TYPE = 'main';
export const SAUCE_TYPE = 'sauce';

export interface MatchParams {
  id?: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type EmailString = string;
export type NameString = string;
export type PasswordString = string;
export type TTokenString = string;
export type TNullableToken = TTokenString | null;

export type TUserData = {
  name?: string; email: EmailString; password: PasswordString;
};

export type IngredientType = {
  readonly _id: string; readonly name: string; readonly type: string | typeof BUN_TYPE | typeof MAIN_TYPE | typeof SAUCE_TYPE; readonly price: number; readonly image: string; readonly uniqueId?: string | number; readonly proteins: number, readonly fat: number, readonly carbohydrates: number, readonly calories: number, readonly image_mobile: string, readonly image_large: string
  readonly __v?: number; count?: number
};

/**
 * Проверяет, соответствует ли объект типу IngredientType.
 *
 * @param {any} object - Объект для проверки.
 * @returns {boolean} Возвращает `true`, если объект соответствует типу
 *   `IngredientType`, иначе `false`.
 */
export function isValidIngredient(object: any): object is IngredientType {
  // Быстрая проверка на объект и не null
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  // Проверка наличия всех обязательных строковых свойств
  const requiredStringProps = [
    '_id', 'name', 'type', 'image', 'image_mobile', 'image_large'];
  if (!requiredStringProps.every(prop => typeof object[prop] === 'string')) {
    return false;
  }

  // Проверка числовых свойств
  const requiredNumberProps = [
    'proteins', 'fat', 'carbohydrates', 'calories', 'price'];
  if (!requiredNumberProps.every(prop => typeof object[prop] === 'number')) {
    return false;
  }

  // Проверка типа ингредиента
  const ingredientTypes = [BUN_TYPE, MAIN_TYPE, SAUCE_TYPE];
  if (!ingredientTypes.includes(object.type)) {
    return false;
  }
  return true;
}

export interface ErrorResponse {
  response: {
    status: number; message: string; name: string;
  };
  name: string;
  message: string;
  status: string;
}

export interface IPasswordAndToken {
  password: PasswordString;
  token: TNullableToken;
}

export function isErrorWithResponse(error: unknown): error is ErrorResponse {
  // Проверяем, что error является объектом и имеет внутри объект response
  if (typeof error === 'object' && error !== null) {
    const response = (
      error as ErrorResponse
    ).response;
    // Проверяем, что response также является объектом и имеет свойство status,
    // которое является числом
    if (typeof response === 'object' && response !== null
      && typeof response.status === 'number' && typeof response.message
      === 'string' && typeof response.name === 'string') {
      // Дополнительные проверки на необязательные поля не требуются, так как
      // они могут быть undefined
      return true;
    }
  }
  return false;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
  payload: {
    message: string;
  };
}

export interface IRejectedResponse {
  success: boolean;
  message: string;
  error?: string;
}

export type TResponse = ISuccessResponse | IRejectedResponse;

// Функция проверки для ISuccessResponse
export function isISuccessResponse(object: any): object is ISuccessResponse {
  return object.success === true && object.payload
    && typeof object.payload.message === 'string';
}

// Функция проверки для IRejectedResponse
export function isIRejectedResponse(object: any): object is IRejectedResponse {
  return object.success === false && typeof object.message === 'string';
}

export interface Order {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface OrderResponse {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface Order {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface Owner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface FetchOrder {
  ingredients: IngredientType[];
  _id: string;
  owner: Owner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}
export interface FetchOrderResponse {
  success: boolean;
  name: string;
  order: FetchOrder;
}

/**
 * Проверяет, соответствует ли объект интерфейсу OrderResponse.
 *
 * Функция выполняет проверку наличия всех необходимых свойств и их типов
 * в предполагаемом объекте ответа заказа, который может быть получен,
 * например,
 * в результате вызова API. Она проверяет, что объект содержит все поля,
 * необходимые для соответствия интерфейсу OrderResponse, включая вложенные
 * поля в массиве orders.
 *
 * @param {any} object - Объект, который необходимо проверить на соответствие
 *   интерфейсу.
 * @returns {boolean} Возвращает true, если объект соответствует интерфейсу
 *   OrderResponse, иначе false.
 */
export function isValidOrderResponse(object: any): object is OrderResponse {
  return (
    typeof object === 'object' && object !== null && typeof object.success
    === 'boolean' && Array.isArray(object.orders) && object.orders.every(
      (order: any) => typeof order === 'object' && typeof order._id === 'string'
        && Array.isArray(order.ingredients) && order.ingredients.every(
          (ingredient: any) => typeof ingredient === 'string')
        && typeof order.status === 'string' && typeof order.name === 'string'
        && typeof order.createdAt === 'string' && typeof order.updatedAt
        === 'string' && typeof order.number === 'number') && typeof object.total
    === 'number' && typeof object.totalToday === 'number'
  );
}

export interface TWsActionsPayload {
  url: string;
  wsConnect: string;
  wsDisconnect: string;
  onOpen?: string;
  onClose?: string;
  onError?: string;
  onMessage?: string;
}

// Определяем интерфейс TWsActions с использованием нового типа payload
export interface TWsActions extends AnyAction {
  type: string;
  payload: TWsActionsPayload;
}

export function isTWsActions(action: AnyAction): action is TWsActions {
  // Проверяем, является ли action объектом и не равен ли он null
  if (typeof action !== 'object' || action === null) {
    return false;
  }

  // Проверяем наличие и тип свойства type у action
  const hasType = 'type' in action && typeof action.type === 'string';

  // Проверяем наличие свойства payload и что оно является объектом и не равно
  // null
  const hasPayload = 'payload' in action && action.payload !== null
    && typeof action.payload === 'object';

  if (!hasType || !hasPayload) {
    return false;
  }

  // Теперь безопасно приводим payload к типу TWsActionsPayload
  const payload = action.payload as TWsActionsPayload;

  // Проверяем наличие и тип свойств в payload
  const hasUrl = 'url' in payload && typeof payload.url === 'string';
  const hasWsConnect = 'wsConnect' in payload && typeof payload.wsConnect
    === 'string';
  const hasWsDisconnect = 'wsDisconnect' in payload
    && typeof payload.wsDisconnect === 'string';

  // Проверка опциональных полей
  const hasOnOpen = !payload.onOpen || typeof payload.onOpen === 'string';
  const hasOnClose = !payload.onClose || typeof payload.onClose === 'string';
  const hasOnError = !payload.onError || typeof payload.onError === 'string';
  const hasOnMessage = !payload.onMessage || typeof payload.onMessage
    === 'string';

  return hasUrl && hasWsConnect && hasWsDisconnect && hasOnOpen && hasOnClose
    && hasOnError && hasOnMessage;
}