import {
  BURGER_CONSTRUCTOR_DROP_ZONE,
  BURGER_CONSTRUCTOR_FIRST_DROP_ELEMENT,
  BURGER_CONSTRUCTOR_SUMMARY_CONTAINER, CONSTRUCTOR_ELEMENT_SELECTOR,
  CONSTRUCTOR_SELECTOR,
  COUNTER_SELECTOR,
  INGREDIENT_SELECTOR,
  INGREDIENT_TAB_SELECTOR,
} from '../../src/utils/constants-for-tests';
import {LOCAL_HOST_URL} from '../../src/utils/constants';

describe('drag and drop', () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_URL)
  });
  it('container is empty by default', () => {
    cy.get(BURGER_CONSTRUCTOR_FIRST_DROP_ELEMENT).contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа');
    cy.get(BURGER_CONSTRUCTOR_SUMMARY_CONTAINER).find('button').as('orderButton')
    cy.get('@orderButton').contains('Оформить заказ').should('be.disabled');
  })

  it('drags and drops ingredient in constructor and increases counter', () => {
    const dataTransfer = new DataTransfer();
    cy.contains('Флюоресцентная булка R2-D3').closest(INGREDIENT_SELECTOR).as('bun');
    cy.get('@bun').trigger('dragstart', { dataTransfer } );
    cy.get(CONSTRUCTOR_SELECTOR).as('dropTarget');
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@bun').find(COUNTER_SELECTOR).should('contain', '1');
    cy.get('@dropTarget').find(CONSTRUCTOR_ELEMENT_SELECTOR).should('have.length', 2);
    cy.get('button').contains('Оформить заказ').should('be.enabled');
    cy.get(INGREDIENT_SELECTOR).contains('Хрустящие минеральные кольца').closest(INGREDIENT_SELECTOR).as('sauce');
    cy.get('@sauce').trigger('dragstart', { dataTransfer } );
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@sauce').find(COUNTER_SELECTOR).should('contain', '1');
    cy.get('@dropTarget').find(CONSTRUCTOR_ELEMENT_SELECTOR).should('have.length', 3);
    cy.get('@sauce').trigger('dragstart', { dataTransfer } );
    cy.get('@dropTarget').trigger('drop', { dataTransfer });
    cy.get('@sauce').find(COUNTER_SELECTOR).should('contain', '2');
    cy.get('@dropTarget').find(CONSTRUCTOR_ELEMENT_SELECTOR).should('have.length', 4);
    cy.get('@dropTarget').find('span[class*="action"]').find('svg[fill="#F2F2F3"]').first().click();
    cy.get('@sauce').find(COUNTER_SELECTOR).should('contain', '1');
    cy.get('@dropTarget').find(CONSTRUCTOR_ELEMENT_SELECTOR).should('have.length', 3);
  })
})