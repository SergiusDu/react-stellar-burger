export const BUN_TYPE = 'bun';
export const MAIN_TYPE = 'main';
export const SAUCE_TYPE = 'sauce';


export type IngredientType = {
    _id: string; name: string; type: string | typeof BUN_TYPE | typeof MAIN_TYPE | typeof SAUCE_TYPE; price: number; image: string; uniqueId?: string; proteins: string, fat: string, carbohydrates: string, calories: string, image_mobile?: string, image_large?: string
    count?: number
};

