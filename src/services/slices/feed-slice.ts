import {createSlice} from '@reduxjs/toolkit';
import {isValidOrderResponse, Order} from '../../utils/types';

interface feedSlice {
  orders: Order[];
  ordersDone: Order[];
  ordersInProcess: Order[];
  total: number;
  totalToday: number;
  connected: boolean;
}

const initialState: feedSlice = {
  orders: [], ordersDone: [], ordersInProcess: [], total: 0, totalToday: 0, connected: false,
};
export const feedSlice = createSlice({
  name: 'feedSlice', initialState, reducers: {
    updateOrdersInformation(state, action) {
      if (isValidOrderResponse(action.payload)) {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.ordersDone = action.payload.orders.filter(
          order => order.status === 'done');
        state.ordersInProcess = action.payload.orders.filter(
          order => order.status !== 'done');
      }
    }, setOrderData(state, action) {
      state.orders = action.payload;
    }, setTotalOrders(state, action) {
      state.total = action.payload;
    }, setTotalTodayOrders(state, action) {
      state.totalToday = action.payload;
    },
  }, extraReducers: builder => {
  },
});

export const {
  updateOrdersInformation, setOrderData, setTotalOrders, setTotalTodayOrders,
} = feedSlice.actions;