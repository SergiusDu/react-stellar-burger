import {createSlice} from '@reduxjs/toolkit';
import {isValidOrderResponse, Order} from '../../utils/types';
import {RootState} from '../store/store';

interface feedSlice {
  allOrders: Order[];
  allDoneOrders: Order[];
  allOrdersInProcess: Order[];
  allTotal: number;
  allTotalToday: number;
  profileOrders: Order[];
  profileDoneOrders: Order[];
  profileOrdersInProcess: Order[];
  profileTotal: number;
  profileTotalToday: number;
  connected: boolean;
}

const initialState: feedSlice = {
  allOrders: [], allDoneOrders: [], allOrdersInProcess: [], profileOrders: [], profileDoneOrders: [], profileOrdersInProcess: [], profileTotal: 0, profileTotalToday: 0, allTotal: 0, allTotalToday: 0, connected: false,
};
export const feedSlice = createSlice({
  name: 'feedSlice', initialState, reducers: {
    updateProfileOrdersInformation(state, action) {
      if (isValidOrderResponse(action.payload)) {
        state.profileOrders = action.payload.orders.sort().reverse();
        state.profileTotal = action.payload.total;
        state.profileTotalToday = action.payload.totalToday;
        state.profileDoneOrders = action.payload.orders.filter(
          order => order.status === 'done');
        state.profileOrdersInProcess = action.payload.orders.filter(
          order => order.status === 'pending');
      }
    },
    updateAllOrdersInformation(state, action) {
      if (isValidOrderResponse(action.payload)) {
        state.allOrders = action.payload.orders.sort().reverse();
        state.allTotal = action.payload.total;
        state.allTotalToday = action.payload.totalToday;
        state.profileDoneOrders = action.payload.orders.filter(
          order => order.status === 'done');
        state.profileOrdersInProcess = action.payload.orders.filter(
          order => order.status === 'pending');
      }
    },
    setOrderData(state, action) {
      state.profileOrders = action.payload;
    }, setTotalOrders(state, action) {
      state.profileTotal = action.payload;
    }, setTotalTodayOrders(state, action) {
      state.profileTotalToday = action.payload;
    },
  }, extraReducers: builder => {
  },
});

export const {
  updateProfileOrdersInformation, updateAllOrdersInformation, setOrderData, setTotalOrders, setTotalTodayOrders,
} = feedSlice.actions;

export const selectOrders = (state: RootState) => state.feedSlice.profileOrders;
export const selectAllOrders = (state: RootState) => state.feedSlice.allOrders;
export const selectTotalTodayOrders = (state: RootState) => state.feedSlice.profileTotalToday;
export const selectAllTotalTodayOrders = (state: RootState) => state.feedSlice.allTotalToday;
export const selectTotalOrders = (state: RootState) => state.feedSlice.profileTotal;
export const selectAllTotalOrders = (state: RootState) => state.feedSlice.allTotal;
