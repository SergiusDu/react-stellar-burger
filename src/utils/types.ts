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

