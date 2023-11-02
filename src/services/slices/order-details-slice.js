import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
} from '../../utils/api';
import {ORDER_URL, POST_METHOD} from '../../utils/constants';
import {refreshAccessToken} from './profile-slice';

export const fetchOrder = createAsyncThunk('orderDetails/sendOrder',
  async (orderData, {
    dispatch,
    rejectWithValue,
  }) => {
    let authToken = getAccessTokenFromCookies();
    if (!authToken) {
      const refreshToken = getRefreshTokenFromCookies();
      if (!refreshToken) {
        return rejectWithValue('Need to be authorized');
      }
      else {
        try {
          const newToken = await dispatch(refreshAccessToken()).unwrap();
          authToken = newToken;
        }
        catch (refreshError) {
          return rejectWithValue('Failed to refresh token');
        }
      }
    }
    const headers = {
      Authorization: authToken,
    };
    try {
      const response = await fetchAPI(
        ORDER_URL, POST_METHOD, {ingredients: orderData}, headers);
      if (response && response.order && response.order.number) {
        return response;
      }
      else {
        return rejectWithValue('Invalid response format');
      }
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const orderDetailsSlice = createSlice({
  name: 'burgerDetails',
  initialState: {
    isLoading: false,
    error: null,
    orderNumber: null,
  },
  reducers: {
    resetOrderNumber: state => {
      state.orderNumber = null;
    },
    fetchOrderStart: state => {
      state.isLoading = true;
    },
    fetchOrderSuccess: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    },
    fetchOrderFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
      state.orderNumber = null;
    }).addCase(fetchOrder.fulfilled, (state, action) => {
      state.orderNumber = action.payload.order.number;
      state.isLoading = false;
    }).addCase(fetchOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.orderNumber = null;
    });
  },
});

export const {resetOrderNumber} = orderDetailsSlice.actions;
export const selectOrderNumber = state => state.orderDetails.orderNumber;
export const selectIsLoading = state => state.orderDetails.isLoading;