// ingredientSlice.spec.ts
import {
  decreaseIngredientAmount,
  fetchIngredients,
  increaseIngredientAmount,
  ingredientSlice,
  ingredientSliceInitialState,
  resetAllIngredientAmount,
  resetSelectedIngredient,
  selectedIngredient,
  selectIngredients,
  selectIsLoading,
  selectIsModalOpen,
  setBunCount,
  setSelectedIngredient,
} from '../slices/ingredient-slice';
import store from '../store/store';

import {GET_INGREDIENTS_ENDPOINT, GET_METHOD} from '../../utils/constants';
import {fetchAPI, getRandomBun, getRandomElement} from '../../utils/api';
import mocked = jest.mocked;
import {data} from '../../utils/data';
import {createMockStore, mockedState} from '../../utils/mockStore';

jest.mock(
  '../../utils/api', () => (
    {
      ...jest.requireActual('../../utils/api'),
      fetchAPI: jest.fn(), // Мок fetchAPI
    }
  ));

describe('ingredientSlice reducer and actions', () => {
  it('should return the initial state on first run', () => {
    expect(ingredientSlice.reducer(undefined, {type: ''})).toEqual(
      ingredientSliceInitialState);
  });
  describe('fetchIngredients action', () => {
    it('should handle a successful fetch', async () => {
      const mockIngredients = {
        data: [
          {
            _id: '1',
            name: 'Bun',
            type: 'bun',
            price: 5,
          }],
      };

      mocked(fetchAPI).mockResolvedValue(mockIngredients);

      const result = await store.dispatch(fetchIngredients());

      expect(fetchAPI).toHaveBeenCalledWith(
        GET_INGREDIENTS_ENDPOINT, GET_METHOD);
      expect(result.type).toBe('ingredient/fetchIngredients/fulfilled');
      expect(result.payload).toEqual(mockIngredients);
    });
  });

  it('should handle a failed fetch', async () => {
    const error = new Error('Network error');
    mocked(fetchAPI).mockRejectedValue(error);
    const result = await store.dispatch(fetchIngredients());
    expect(result.type).toBe('ingredient/fetchIngredients/rejected');
    expect(result.payload).toBe(`Ошибка,  ${error.message}`);
  });
  it('should handle setSelectedIngredient', () => {
    const mockIngredient = getRandomElement(data);
    const action = {
      type: setSelectedIngredient.type,
      payload: mockIngredient,
    };
    const state = ingredientSlice.reducer(ingredientSliceInitialState, action);
    expect(state.selectedIngredient).toEqual(mockIngredient);
  });
  it('should handle resetSelectedIngredient', () => {
    const stateWithSelectedIngredient = {
      ...ingredientSliceInitialState,
      selectedIngredient: getRandomElement(data),
    };
    const action = {type: resetSelectedIngredient.type};
    const state = ingredientSlice.reducer(stateWithSelectedIngredient, action);
    expect(state.selectedIngredient).toBeNull();
  });
  it('should handle increaseIngredientAmount', () => {
    const mockIngredient = getRandomElement(data);
    const initialStateWithIngredient = {
      ...ingredientSliceInitialState,
      ingredients: [
        {
          ...mockIngredient,
          count: 1,
        }],
    };
    const action = {
      type: increaseIngredientAmount.type,
      payload: mockIngredient._id,
    };
    const state = ingredientSlice.reducer(initialStateWithIngredient, action);
    const ingredientCount = state.ingredients.find(
      i => i._id === mockIngredient._id)?.count;
    expect(ingredientCount).toBe(2);
  });
  it('should handle decreaseIngredientAmount', () => {
    const mockIngredient = getRandomElement(data);
    const mockIngredientId = mockIngredient._id;
    const initialStateWithIngredient = {
      ...ingredientSliceInitialState,
      ingredients: [
        {
          ...mockIngredient,
          count: 2,
        }],
    };
    const action = {
      type: decreaseIngredientAmount.type,
      payload: mockIngredientId,
    };
    const state = ingredientSlice.reducer(initialStateWithIngredient, action);
    const ingredientCount = state.ingredients.find(
      i => i._id === mockIngredientId)?.count;
    expect(ingredientCount).toBe(1);
  });

  it('should handle resetAllIngredientAmount', () => {
    const mockIngredient1 = getRandomElement(data);
    const mockIngredient2 = getRandomElement(data);
    const initialStateWithCounts = {
      ...ingredientSliceInitialState,
      ingredients: [
        {
          ...mockIngredient1,
          count: 2,
        },
        {
          ...mockIngredient2,
          count: 3,
        }],
    };
    const action = {type: resetAllIngredientAmount.type};
    const state = ingredientSlice.reducer(initialStateWithCounts, action);
    expect(state.ingredients.every(i => !i.count)).toBeTruthy();
  });
  it('should handle setBunCount', () => {
    const mockBun1 = getRandomBun(data);
    const mockBun2 = getRandomBun(data);
    const bunId = mockBun1._id;
    const initialStateWithBuns = {
      ...ingredientSliceInitialState,
      ingredients: [
        {...mockBun1},
        {
          ...mockBun2,
          count: 1,
        }],
    };
    const action = {
      type: setBunCount.type,
      payload: bunId,
    };
    const state = ingredientSlice.reducer(initialStateWithBuns, action);
    expect(state.ingredients.find(i => i._id === bunId)?.count).toBe(1);
    expect(
      state.ingredients.find(i => i._id !== bunId && i.type === 'bun')?.count)
      .toBeUndefined();
  });
});

describe('ingredientSlice selectors', () => {
  it('selectIngredients should return the list of ingredients', () => {

    expect(selectIngredients(mockedState)).toEqual(mockedState.ingredient.ingredients);
  });

  it('selectedIngredient should return the selected ingredient', () => {
    expect(selectedIngredient(mockedState)).toEqual(
      mockedState.ingredient.selectedIngredient);
  });

  it('selectIsLoading should return loading state', () => {
    expect(selectIsLoading(mockedState)).toEqual(mockedState.ingredient.isLoading);
  });

  it('selectIsModalOpen should return modal open state', () => {
    expect(selectIsModalOpen(mockedState)).toEqual(mockedState.ingredient.isModalOpen);
  });
});
