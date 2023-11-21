import {LOCAL_HOST_URL} from '../../src/utils/constants';
import {
  BODY_SELECTOR,
  INGREDIENT_DETAILS_CONTAINER,
  INGREDIENT_SELECTOR,
} from '../../src/utils/constants-for-tests';

describe('does-modal-window-with-ingredients-work', () => {
  beforeEach(() => {
    cy.visit(LOCAL_HOST_URL)
  })
  it('Toggles the ingredient details modal close actions by pressing the Escape key.', () => {
    cy.get(INGREDIENT_SELECTOR).contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Детали ингредиента');
    cy.get(BODY_SELECTOR).type('{esc}');
  })
  it('To open and close the ingredient details modal when the close button is clicked.', () => {
    cy.get(INGREDIENT_SELECTOR).contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Детали ингредиента');
    cy.get(INGREDIENT_DETAILS_CONTAINER).parent().find('button').click();
  })
  it('Enables the opening and closing of the ingredient details modal by clicking on the overlay.', () => {
    cy.get(INGREDIENT_SELECTOR).contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Детали ингредиента');
    cy.get(INGREDIENT_DETAILS_CONTAINER).parent().parent().click({force: true});
  })
})
