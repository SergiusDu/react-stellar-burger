import {LOCAL_HOST_URL} from '../../src/utils/constants';
import {
  BUN_SECTION_SELECTOR,
  FILLINGS_SECTION_SELECTOR,
  INGREDIENT_LIST_SELECTOR,
  INGREDIENT_SELECTOR,
  INGREDIENT_TAB_SELECTOR,
  SAUCES_SECTION_SELECTOR,
} from '../../src/utils/constants-for-tests';

describe('displaying ingredients', () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_URL);
  });

  it('are-ingredients-presented', () => {
    cy.get(INGREDIENT_LIST_SELECTOR).as('scrollBarWithIngredients');
    cy.get('@scrollBarWithIngredients').should('contain', 'Булки');
    cy.get('@scrollBarWithIngredients').should('contain', 'Соусы');
    cy.get('@scrollBarWithIngredients').should('contain', 'Начинки');
    cy.get('@scrollBarWithIngredients').find(BUN_SECTION_SELECTOR).as('buns');
    cy.get('@buns').should('have.length.above', 0);
    cy.get('@scrollBarWithIngredients').find(SAUCES_SECTION_SELECTOR).as('sauces');
    cy.get('@sauces').should('have.length.above', 0);
    cy.get('@scrollBarWithIngredients').find(FILLINGS_SECTION_SELECTOR).as(
      'fillings');
    cy.get('@fillings').should('have.length.above', 0);

    cy.get('@buns').find(INGREDIENT_SELECTOR).should('have.length.above', 0);
    cy.get('@sauces').find(INGREDIENT_SELECTOR).should('have.length.above', 0);
    cy.get('@fillings').find(INGREDIENT_SELECTOR).should(
      'have.length.above', 0);
  });

  it('do-tabs-work-well', () => {
    cy.get(INGREDIENT_TAB_SELECTOR).first().should(
      'have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).next().first().should(
      'not.have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).last().should(
      'not.have.class', 'tab_type_current');

    cy.get(INGREDIENT_TAB_SELECTOR).next().first().click();
    cy.get(INGREDIENT_TAB_SELECTOR).first().should(
      'not.have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).next().first().should(
      'have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).last().should(
      'not.have.class', 'tab_type_current');

    cy.get(INGREDIENT_TAB_SELECTOR).next().last().click();
    cy.get(INGREDIENT_TAB_SELECTOR).first().should(
      'not.have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).next().first().should(
      'not.have.class', 'tab_type_current');
    cy.get(INGREDIENT_TAB_SELECTOR).last().should(
      'have.class', 'tab_type_current');
  });
});