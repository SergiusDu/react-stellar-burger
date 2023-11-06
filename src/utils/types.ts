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
export type TTokenString = string | null;

export type TUserData = {
  email: EmailString;
  password: PasswordString;
};

export type IngredientType = {
  readonly _id: string;
  readonly name: string;
  readonly type: string | typeof BUN_TYPE | typeof MAIN_TYPE | typeof SAUCE_TYPE;
  readonly price: number;
  readonly image: string;
  readonly uniqueId?: string;
  readonly proteins: string,
  readonly fat: string,
  readonly carbohydrates: string,
  readonly calories: string,
  readonly image_mobile: string,
  readonly image_large: string
  count?: number
};

export interface ErrorResponse {
  response: {
    status: number;
    message: string;
    name: string;
  };
  name: string;
  message: string;
  status: string
}
export function isErrorWithResponse(error: unknown): error is ErrorResponse {
  // Проверяем, что error является объектом и имеет внутри объект response
  if (typeof error === 'object' && error !== null) {
    const response = (error as ErrorResponse).response;
    // Проверяем, что response также является объектом и имеет свойство status, которое является числом
    if (typeof response === 'object' &&
      response !== null &&
      typeof response.status === 'number' &&
      typeof response.message === 'string' &&
      typeof response.name === 'string')
      {
      // Дополнительные проверки на необязательные поля не требуются, так как они могут быть undefined
      return true;
    }
  }
  return false;
}


