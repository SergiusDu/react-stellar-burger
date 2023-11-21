// orderDetailsSlice.spec.ts
import {
  fetchOrder, orderDetailsSlice, OrderDetailsState, resetOrderNumber,
} from './order-details-slice';

import * as apiUtils from '../../utils/api';
import {ThunkAction} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import configureMockStore, {MockStore} from 'redux-mock-store';
import {fetchOrderResponseMock} from '../../utils/mockConstants';
import {RootState} from '../store/store';
import {createMockStore} from '../../utils/mockStore';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, any>(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;
describe('async POST order details actions', () => {
  let store: MockStore<RootState>;

  beforeEach(() => {
    store = createMockStore();
  });
  beforeEach(() => {
    jest.spyOn(apiUtils, 'getAccessTokenFromCookies').mockReturnValue(
      'test-token');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts order', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(fetchOrderResponseMock), ok: true,
    } as any);
    const sendMock = [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093c'];
    const expectedActions = [
      {
        type: 'orderDetails/sendOrder/pending', meta: {
          arg: sendMock, requestId: expect.anything(), requestStatus: 'pending',
        },
      }, {
        type: 'orderDetails/sendOrder/fulfilled', payload: expect.anything(), meta: expect.anything(),
      }];
    const dispatch = store.dispatch as MockDispatch;
    return dispatch(fetchOrder(sendMock)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('reducers', () => {
    it('should handle resetOrderNumber', () => {
      store.dispatch(resetOrderNumber());
      const actions = store.getActions();
      const expectedPayload = {type: 'burgerDetails/resetOrderNumber'};
      expect(actions).toEqual([expectedPayload]);
      const newState = orderDetailsSlice.reducer(
        store.getState().orderDetails, resetOrderNumber());
      expect(newState.orderNumber).toBeNull();
    });
  });

});


