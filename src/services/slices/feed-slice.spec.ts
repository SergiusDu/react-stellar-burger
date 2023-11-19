import {
  connectWebSocket,
  disconnectWebSocket,
  feedSlice, selectAllOrders,
  selectAllTotalOrders,
  selectAllTotalTodayOrders,
  selectProfileOrders,
  selectTotalOrders,
  selectTotalTodayOrders,
  selectWebSocketStatus,
  setOrderData,
  setTotalOrders,
  setTotalTodayOrders,
  updateAllOrdersInformation,
  updateProfileOrdersInformation,
} from './feed-slice';
import {Order} from '../../utils/types';
import {allOrdersWsServerResponse} from '../../utils/mockAllOrders';
import {profileOrdersWsServerResponse} from '../../utils/mockProfileOrders';
import {getRandomElement} from '../../utils/api';
import {RootState, testState} from '../store/store';

describe('feedSlice reducers', () => {
  const initialState = feedSlice.getInitialState();
  const allOrders: Order[] = allOrdersWsServerResponse.orders;
  const allTotalOrders = allOrdersWsServerResponse.total;
  const allTotalOrdersToday = allOrdersWsServerResponse.totalToday;
  const profileOrders: Order[] = profileOrdersWsServerResponse.orders;
  const profileTotalOrders = profileOrdersWsServerResponse.total;
  const profileTotalOrdersToday = profileOrdersWsServerResponse.totalToday;
  it('should handle initial state', () => {
    expect(feedSlice.reducer(undefined, {type: 'unknown'})).toEqual(
      initialState);
  });

  it('should handle updateAllOrdersInformation', () => {
    const action = {
      type: updateAllOrdersInformation.type,
      payload: allOrdersWsServerResponse,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.allOrders).toEqual(allOrders);
    expect(state.allTotal).toEqual(allTotalOrders);
    expect(state.allTotalToday).toEqual(allTotalOrdersToday);
  });
  it('should handle updateProfileOrdersInformation', () => {
    const action = {
      type: updateProfileOrdersInformation.type,
      payload: profileOrdersWsServerResponse,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.profileOrders).toEqual(profileOrders);
    expect(state.profileTotal).toEqual(profileTotalOrders);
    expect(state.profileTotalToday).toEqual(profileTotalOrdersToday);
    // проверка на profileDoneOrders и profileOrdersInProcess
  });

  it('should handle connectWebSocket and disconnectWebSocket', () => {
    let state = feedSlice.reducer(initialState, connectWebSocket());
    expect(state.isWebSocketOpened).toBeTruthy();

    state = feedSlice.reducer(initialState, disconnectWebSocket());
    expect(state.isWebSocketOpened).toBeFalsy();
  });
  it('should handle setOrderData', () => {
    const mockOrderData = getRandomElement(allOrders);
    const action = {
      type: setOrderData.type,
      payload: mockOrderData,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.profileOrders).toEqual(mockOrderData);
  });

  it('should handle setTotalOrders', () => {
    const mockTotalOrders = allTotalOrders;
    const action = {
      type: setTotalOrders.type,
      payload: mockTotalOrders,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.profileTotal).toEqual(mockTotalOrders);
  });

  it('should handle setTotalTodayOrders', () => {
    const mockTotalTodayOrders = allTotalOrdersToday;
    const action = {
      type: setTotalTodayOrders.type,
      payload: mockTotalTodayOrders,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.profileTotalToday).toEqual(mockTotalTodayOrders);
  });

  it('should not update state for invalid order data', () => {
    const invalidOrderData = {type: 'adsasdasd'};
    const action = {
      type: updateAllOrdersInformation.type,
      payload: invalidOrderData,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle WebSocket connection status', () => {
    let state = feedSlice.reducer(initialState, connectWebSocket());
    expect(state.isWebSocketOpened).toBeTruthy(); // Проверяем isWebSocketOpened, а не connected

    state = feedSlice.reducer(initialState, disconnectWebSocket());
    expect(state.isWebSocketOpened).toBeFalsy(); // Аналогично проверяем isWebSocketOpened
  });


  it('should not update state with invalid order data', () => {
    const invalidOrderData = { invalid: 'data' };
    const action = {
      type: updateAllOrdersInformation.type,
      payload: invalidOrderData,
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
  // Тесты для селекторов
  it('should select correct profile orders', () => {
    const mockOrder = getRandomElement(profileOrders);
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        profileOrders: [mockOrder]
      }
    };
    expect(selectProfileOrders(customTestState)).toEqual([mockOrder]);
  });

  it('should select all orders correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        allOrders
      }
    };
    expect(selectAllOrders(customTestState)).toEqual(allOrders);
  });

  it('should select total today orders correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        profileTotalToday: allTotalOrdersToday
      }
    };
    expect(selectTotalTodayOrders(customTestState)).toEqual(allTotalOrdersToday);
  });


  it('should select all total today orders correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        allTotalToday: allTotalOrdersToday
      }
    };
    expect(selectAllTotalTodayOrders(customTestState)).toEqual(allTotalOrdersToday);
  });

  it('should select total orders correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        profileTotal: profileTotalOrders
      }
    };
    expect(selectTotalOrders(customTestState)).toEqual(profileTotalOrders);
  });

  it('should select all total orders correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        allTotal: allTotalOrders
      }
    };
    expect(selectAllTotalOrders(customTestState)).toEqual(allTotalOrders);
  });

  it('should select WebSocket status correctly', () => {
    const customTestState = {
      ...testState,
      feedSlice: {
        ...testState.feedSlice,
        isWebSocketOpened: true
      }
    };
    expect(selectWebSocketStatus(customTestState)).toBeTruthy();
  });
});
