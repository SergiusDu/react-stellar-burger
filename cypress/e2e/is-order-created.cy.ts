import {
  BODY_SELECTOR,
  BURGER_CONSTRUCTOR_SUMMARY_CONTAINER,
  BUTTON_SELECTOR,
  CONSTRUCTOR_SELECTOR,
  EMAIL_INPUT_SELECTOR,
  FORM_ERROR_SELECTOR,
  FORM_SELECTOR,
  INGREDIENT_SELECTOR,
  ORDER_NUMBER_SELECTOR,
  PASSWORD_INPUT_SELECTOR,
  SEND_ORDER_BUTTON,
  SUBMIT_BUTTON_SELECTOR,
  TEST_USER_CREDENTIALS,
} from '../../src/utils/constants-for-tests';
import {TUserData} from '../../src/utils/types';
import {
  LOCAL_HOST_URL, LOGIN_ENDPOINT, LOGIN_PAGE_PATH, MAIN_PAGE_PATH,
} from '../../src/utils/constants';

describe('send order', () => {
  beforeEach(() => {
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  })
  it('should be able to send an order', () => {
    cy.visit(LOCAL_HOST_URL);
    const dataTransfer = new DataTransfer();
    cy.get(INGREDIENT_SELECTOR).contains('Флюоресцентная булка R2-D3').trigger(
      'dragstart', {dataTransfer});
    cy.get(CONSTRUCTOR_SELECTOR).find('div').first().as('dropTarget');
    cy.get('@dropTarget').trigger('drop', {dataTransfer});
    cy.get(INGREDIENT_SELECTOR).contains('Хрустящие минеральные кольца').trigger(
      'dragstart', {dataTransfer});
    cy.get('@dropTarget').trigger('drop', {dataTransfer});
    cy.get(SEND_ORDER_BUTTON).as('sendOrderButton');
    cy.get('@sendOrderButton').should('be.enabled');
    cy.get('@sendOrderButton').click();
    cy.url().then((url) => {
      if (url.includes(LOGIN_PAGE_PATH)) {
        cy.log('Необходимо авторизоваться');
        cy.get(EMAIL_INPUT_SELECTOR).as('emailInput');
        cy.get(PASSWORD_INPUT_SELECTOR).as('passwordInput');
        cy.get(SUBMIT_BUTTON_SELECTOR).as('submitButton');
        cy.get(FORM_SELECTOR).as('loginForm');
        cy.get('@emailInput').click();
        cy.get('@emailInput').type(TEST_USER_CREDENTIALS.email);
        cy.get('@emailInput').should(
          'contain.value', TEST_USER_CREDENTIALS.email);
        cy.get('@passwordInput').click();
        cy.get('@passwordInput').type(TEST_USER_CREDENTIALS.password);
        cy.get('@passwordInput').should(
          'contain.value', TEST_USER_CREDENTIALS.password);
        cy.get('@loginForm').find(FORM_ERROR_SELECTOR).should('have.length', 0);
        cy.get('@submitButton').click();
        cy.url().should('include', MAIN_PAGE_PATH);
      }
    });
    cy.get(BURGER_CONSTRUCTOR_SUMMARY_CONTAINER).find(BUTTON_SELECTOR).as(
      'orderSubmitButton');
    cy.get('@orderSubmitButton').click();
    cy.get(ORDER_NUMBER_SELECTOR, {timeout: 20000}).as('orderNumber');
    cy.get(BODY_SELECTOR).type('{esc}');
    cy.get('@orderNumber').should('not.exist');
  });
});