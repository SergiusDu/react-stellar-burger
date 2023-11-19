import {
  connectWebSocket, disconnectWebSocket,
  feedSlice,
  updateAllOrdersInformation,
  updateProfileOrdersInformation,
} from './feed-slice';
import {Order} from '../../utils/types';
import {allOrdersWsServerResponse} from '../../utils/mockAllOrders';
import {profileOrdersWsServerResponse} from '../../utils/mockProfileOrders';

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

});