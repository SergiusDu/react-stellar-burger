import {
  addIngredient,
  burgerConstructorSlice,
  BurgerConstructorSliceInitialState,
  BurgerConstructorState,
  moveItem,
  removeIngredient,
  resetIngredients,
  selectBun,
  selectIngredients,
  setBun,
} from './burger-constructor-slice';
import {IngredientType} from '../../utils/types';
import {data} from '../../utils/data';
import {
  getRandomBun, getRandomBurgerIngredient, getRandomElement,
} from '../../utils/api';
import {createMockStore} from '../../utils/mockStore';

describe('burgerConstructorSlice', () => {

  it('should handle addIngredient', () => {
    const initialState = {
      ingredients: [],
      bun: null,
    };
    const ingredient: IngredientType = data[0];
    const nextState = burgerConstructorSlice.reducer(
      initialState, addIngredient(ingredient));
    expect(nextState.ingredients.length).toBe(1);
  });
  it('should handle removeIngredient', () => {
    const ingredient = getRandomBurgerIngredient(data);
    const stateWithIngredient = {
      ...BurgerConstructorSliceInitialState,
      ingredients: [ingredient],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithIngredient, removeIngredient(ingredient.uniqueId));
    expect(nextState.ingredients.length).toBe(0);
  });
  it('should handle setBun', () => {
    const bun = getRandomBun(data);
    const nextState = burgerConstructorSlice.reducer(
      BurgerConstructorSliceInitialState, setBun(bun));
    expect(nextState.bun).toEqual(bun);
  });
  it('should not remove an ingredient if uniqueId not found', () => {
    const ingredient = getRandomBurgerIngredient(data);
    const stateWithIngredient = {
      ...BurgerConstructorSliceInitialState,
      ingredients: [ingredient],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithIngredient, removeIngredient(ingredient._id + 'rsdf'));
    expect(nextState.ingredients.length).toBe(1);
  });
  it('should handle moveItem', () => {
    const ingredients: IngredientType[] = [
      {
        ...data[0],
        uniqueId: 1,
      }, {
        ...data[1],
        uniqueId: 2,
      }];
    const initialState = {
      ingredients,
      bun: null,
    };
    const nextState = burgerConstructorSlice.reducer(initialState, moveItem({
      fromIndex: 0,
      toIndex: 1,
    }));
    expect(nextState.ingredients[0].uniqueId).toBe(2);
    expect(nextState.ingredients[1].uniqueId).toBe(1);
  });
  it('should handle resetIngredients', () => {
    const ingredient = getRandomBurgerIngredient(data);
    const stateWithIngredients = {
      ...BurgerConstructorSliceInitialState,
      ingredients: [ingredient, ingredient],
    };
    const nextState = burgerConstructorSlice.reducer(
      stateWithIngredients, resetIngredients());
    expect(nextState.ingredients.length).toBe(0);
  });
  it('should maintain correct order after moving items', () => {
    const ingredients = data.slice(0, 3).map((
      item,
      index,
    ) => (
      {
        ...item,
        uniqueId: index,
      }
    ));
    const modifiedState = {
      ...BurgerConstructorSliceInitialState,
      ingredients,
    };
    const nextState = burgerConstructorSlice.reducer(modifiedState, moveItem({
      fromIndex: 0,
      toIndex: 2,
    }));
    expect(nextState.ingredients[0].uniqueId).toBe(1);
    expect(nextState.ingredients[1].uniqueId).toBe(2);
    expect(nextState.ingredients[2].uniqueId).toBe(0);
  });
  it('should not change state if moveItem called with invalid indexes', () => {
    const ingredients = data.slice(0, 2).map((
      item,
      index,
    ) => (
      {
        ...item,
        uniqueId: index,
      }
    ));
    const modifiedState = {
      ...BurgerConstructorSliceInitialState,
      ingredients,
    };
    const nextState = burgerConstructorSlice.reducer(modifiedState, moveItem({
      fromIndex: -1,
      toIndex: 3,
    }));
    expect(nextState).toEqual(modifiedState);
  });
  it('should add multiple ingredients correctly', () => {
    let state = BurgerConstructorSliceInitialState;
    data.slice(0, 3).forEach(ingredient => {
      state = burgerConstructorSlice.reducer(state, addIngredient(ingredient));
    });
    expect(state.ingredients.length).toBe(3);
  });
  it('should not change bun when modifying ingredients', () => {
    const bun = getRandomBun(data);
    let state = burgerConstructorSlice.reducer(
      BurgerConstructorSliceInitialState, setBun(bun));
    state = burgerConstructorSlice.reducer(state, addIngredient(data[0]));
    expect(state.bun).toEqual(bun);
  });

  // Тесты для селекторов
  it('selects the ingredients correctly', () => {
    const testIngredients: IngredientType[] = [
      getRandomBun(data), getRandomElement(data)];
    const store = createMockStore({
      burgerConstructor: {
        ...BurgerConstructorSliceInitialState,
        ingredients: testIngredients,
      },
    });
    const state = store.getState();
    expect(selectIngredients(state)).toEqual(testIngredients);
  });

  it('selects the bun correctly', () => {
    const testBun: IngredientType = getRandomBun(data);
    const store = createMockStore({
      burgerConstructor: {
        ...BurgerConstructorSliceInitialState,
        bun: testBun,
      },
    });
    const state = store.getState();
    expect(selectBun(state)).toEqual(testBun);
  });
});
