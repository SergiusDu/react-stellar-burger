// ingredientSlice.spec.ts
import {
  fetchIngredients,
  ingredientSlice,
  selectedIngredient,
  selectIngredients,
  selectIsLoading,
  selectIsModalOpen,
} from '../slices/ingredient-slice';
import store, {RootState, testState} from '../store/store';

import {GET_INGREDIENTS_ENDPOINT, GET_METHOD} from '../../utils/constants';
import {fetchAPI} from '../../utils/api';

jest.mock('../../utils/api', () => ({
  ...jest.requireActual('../../utils/api'),
  fetchAPI: jest.fn(), // Мок fetchAPI
}));

describe('ingredientSlice reducer and actions', () => {
  const initialState: RootState['ingredient'] = {
    ingredients: [], isLoading: false, error: null, defaultBunSet: false, selectedIngredient: null, isModalOpen: false,
  };
  it('should return the initial state on first run', () => {
    // Check whether the reducer returns the initial state when given an
    // undefined state
    expect(ingredientSlice.reducer(undefined, {type: ''})).toEqual(
      initialState);
  });
  describe('fetchIngredients action', () => {
    it('should handle a successful fetch', async () => {
      const mockIngredients = {data: [{_id: '1', name: 'Bun', type: 'bun', price: 5}]};

      // Настройте мок перед диспатчем экшена
      (fetchAPI as jest.Mock).mockResolvedValue(mockIngredients);

      // Вызовите экшен
      const result = await store.dispatch(fetchIngredients());

      // Проверьте, что мок был вызван с ожидаемыми параметрами
      expect(fetchAPI).toHaveBeenCalledWith(
        GET_INGREDIENTS_ENDPOINT, GET_METHOD);

      // Проверьте результат экшена
      expect(result.type).toBe('ingredient/fetchIngredients/fulfilled');
      expect(result.payload).toEqual(mockIngredients);
    });
  });

  it('should handle a failed fetch', async () => {
    const error = new Error('Network error');
    (fetchAPI as jest.Mock).mockRejectedValue(error);
    const result = await store.dispatch(fetchIngredients());
    expect(result.type).toBe('ingredient/fetchIngredients/rejected');
    expect(result.payload).toBe(`Ошибка,  ${error.message}`);
  });

});

describe('ingredientSlice selectors', () => {
  it('selectIngredients should return the list of ingredients', () => {
    expect(selectIngredients(testState)).toEqual(testState.ingredient.ingredients);
  });

  it('selectedIngredient should return the selected ingredient', () => {
    expect(selectedIngredient(testState)).toEqual(
      testState.ingredient.selectedIngredient);
  });

  it('selectIsLoading should return loading state', () => {
    expect(selectIsLoading(testState)).toEqual(testState.ingredient.isLoading);
  });

  it('selectIsModalOpen should return modal open state', () => {
    expect(selectIsModalOpen(testState)).toEqual(testState.ingredient.isModalOpen);
  });

});
