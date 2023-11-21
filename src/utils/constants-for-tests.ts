import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE, TUserData} from './types';
import {getRandomElement} from './api';
import {data} from './data';

export const INGREDIENT_SELECTOR = 'li[class*=ingredient_ingredient]' as const;
export const INGREDIENT_TAB_SELECTOR = 'div[class^=tab]' as const;
export const COUNTER_SELECTOR = 'p[class*=counter__num]' as const;
export const CONSTRUCTOR_SELECTOR = 'section[class*=constructor]' as const;
export const CONSTRUCTOR_ELEMENT_SELECTOR = 'div[class^=constructor-element]' as const;
export const INGREDIENT_LIST_SELECTOR = 'section[class*=ingredient-list_category_ingredient_list]' as const;
export const BUN_SECTION_SELECTOR = `#${BUN_TYPE}` as const;
export const SAUCES_SECTION_SELECTOR = `#${SAUCE_TYPE}` as const;
export const FILLINGS_SECTION_SELECTOR = `#${MAIN_TYPE}` as const;
export const INGREDIENT_DETAILS_CONTAINER = 'figure[class*=ingredient-details_ingredient_details]' as const;
export const BODY_SELECTOR = 'body' as const;
export const BURGER_CONSTRUCTOR_DROP_ZONE = 'div[class*=burger-constructor_burger_constructor]' as const;
export const BURGER_CONSTRUCTOR_FIRST_DROP_ELEMENT = 'div[class*=burger-constructor_add_bun_container]' as const;
export const BURGER_CONSTRUCTOR_SUMMARY_CONTAINER = 'div[class*=burger-constructor_sum_element_]' as const;
export const SEND_ORDER_BUTTON = `${BURGER_CONSTRUCTOR_SUMMARY_CONTAINER} button[class*=button]` as const;
export const TEST_USER_CREDENTIALS: TUserData = {
  email: 'testov@testov.com', password: 'testov',
} as const;
export const EMAIL_INPUT_SELECTOR = 'input[type=email]' as const;
export const PASSWORD_INPUT_SELECTOR = 'input[type=password]' as const;
export const SUBMIT_BUTTON_SELECTOR = 'button[type=submit]' as const;
export const BUTTON_SELECTOR = 'button';
export const FORM_SELECTOR = 'form[class*=form_form]' as const;
export const FORM_ERROR_SELECTOR = 'p[class*=input__error]' as const;
export const ORDER_NUMBER_SELECTOR = 'h2[class*=order-details_order_number]' as const;