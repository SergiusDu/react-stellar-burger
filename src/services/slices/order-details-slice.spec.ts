// orderDetailsSlice.spec.ts
import store, {RootState} from '../store/store';
import {
  fetchAPI,
  getRandomBun,
  getRandomBurgerIngredient,
} from '../../utils/api';

import {ORDER_URL, POST_METHOD} from '../../utils/constants';
import {
  fetchOrder,
  orderDetailsSlice,
  selectOrderNumber,
} from './order-details-slice';
import {selectIsLoading} from './ingredient-slice';
import {data} from '../../utils/data';
import mocked = jest.mocked;

jest.mock('../../utils/api');
jest.mock(
  '../../utils/constants', () => (
    {
      ...jest.requireActual(
        '../../utils/constants'), ORDER_URL: '/order', POST_METHOD: 'POST',
    }
  ));
jest.mock(
  '../../utils/api', () => (
    {
      ...jest.requireActual(
        '../../utils/api'), getAccessTokenFromCookies: jest.fn(), getRefreshTokenFromCookies: jest.fn(), fetchAPI: jest.fn(),
    }
  ));

describe('orderDetailsSlice reducer and actions', () => {
  const initialState: RootState['orderDetails'] = {
    isLoading: false, error: null, orderNumber: null, ingredients: null,
  };

  it('should return the initial state on first run', () => {
    expect(orderDetailsSlice.reducer(undefined, {type: ''})).toEqual(
      initialState);
  });

  // Тесты для редьюсеров
  // ...

  describe('fetchOrder async action', () => {
    it('should handle successful order fetch', async () => {
      const bunId = getRandomBun(data)._id;
      const ingredientId = getRandomBurgerIngredient(data)._id;
      const mockResponse = {order: {number: 123}};
      mocked(fetchAPI).mockResolvedValue(mockResponse);
      const result = await store.dispatch(fetchOrder([bunId, ingredientId]));
      expect(fetchAPI).toHaveBeenCalledWith(ORDER_URL, POST_METHOD,
        {ingredients: [bunId, ingredientId]},
        {Authorization: expect.anything()},
      );
      expect(result.type).toBe('orderDetails/sendOrder/fulfilled');
      expect(result.payload).toEqual(mockResponse);
    });

    it('should handle failed order fetch', async () => {
      const errorResponse = new Error("Need to be authorized");
      mocked(fetchAPI).mockRejectedValue(errorResponse);
      const result = await store.dispatch(
        fetchOrder(['ingredient1', 'ingredient2']));
      expect(result.type).toBe('orderDetails/sendOrder/rejected');
      expect(result.payload).toEqual(errorResponse.message);
    });

  });
});

