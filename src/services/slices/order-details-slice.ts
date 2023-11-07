import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import fetchAPI, {getAccessTokenFromCookies, getRefreshTokenFromCookies} from '../../utils/api';
import {ORDER_URL, POST_METHOD} from '../../utils/constants';
import {refreshAccessToken} from './profile-slice';
import {IngredientType, TNullableToken} from '../../utils/types';
import {RootState} from '../store/store';

export const fetchOrder = createAsyncThunk('orderDetails/sendOrder', async (
  orderData: string[],
  {dispatch, rejectWithValue},
) => {
  let authToken: TNullableToken = getAccessTokenFromCookies();
  const sendRequestWithToken = async (token: TNullableToken) => {
    try {
      const response = await fetchAPI(ORDER_URL, POST_METHOD, {ingredients: orderData}, {Authorization: token});

      // Проверяем, был ли ответ преобразован в JSON и содержит ли он поле order с полем number
      if (response.order && response.order.number) {
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      // Если fetchAPI выбросил исключение, мы его здесь перехватываем
      if (error instanceof Error) {
        // Now TypeScript knows error is an Error object
        if (error.name === 'AbortError') {
          return rejectWithValue('Request was aborted');
        }
        if (error.message === 'Failed to fetch') {
          return rejectWithValue('Network request failed');
        }
        return rejectWithValue(error.message);
      } else {
        // If it's not an Error object, we can handle it accordingly or throw an unexpected error type
        return rejectWithValue('An unexpected error occurred');
      }
    }
  };

  if (!authToken) {
    const refreshToken = getRefreshTokenFromCookies();
    if (!refreshToken) {
      return rejectWithValue('Need to be authorized');
    }
    try {
      authToken = await dispatch(refreshAccessToken()).unwrap();
    } catch (refreshError) {
      return rejectWithValue('Failed to refresh token');
    }
  }

  // Отправляем запрос с токеном
  return sendRequestWithToken(authToken).catch(async (error) => {
    if (error.message === 'Failed to fetch') {
      // Если ошибка связана с сетью, пытаемся еще раз отправить запрос
      return sendRequestWithToken(authToken);
    } else if (error.message === 'Invalid response format' || error.message === 'Need to be authorized') {
      // Если формат ответа неверен или требуется авторизация, обновляем токен
      const newToken = await dispatch(refreshAccessToken()).unwrap();
      return sendRequestWithToken(newToken);
    } else {
      return rejectWithValue(error.message);
    }
  });
});

interface OrderDetailsState {
  isLoading: boolean;
  error: string | null;
  orderNumber: number | null;
  ingredients: IngredientType[] | null;
}

const initialState: OrderDetailsState = {
  isLoading: false, error: null, orderNumber: null, ingredients: null,
};
export const orderDetailsSlice = createSlice({
  name: 'burgerDetails', initialState, reducers: {
    resetOrderNumber: state => {
      state.orderNumber = null;
    }, fetchOrderStart: state => {
      state.isLoading = true;
    }, fetchOrderSuccess: (
      state,
      action,
    ) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }, fetchOrderFailed: (
      state,
      action,
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  }, extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
      state.orderNumber = null;
    }).addCase(fetchOrder.fulfilled, (
      state,
      action,
    ) => {
      state.orderNumber = action.payload.order.number;
      state.isLoading = false;
    }).addCase(fetchOrder.rejected, (
      state,
      action: PayloadAction<unknown, string, {
        arg: string[];
        requestId: string;
        rejectedWithValue: boolean;
      }, SerializedError>,
    ) => {
      if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
        const serializedError = action.payload as SerializedError;
        state.error = serializedError.message || null;
      } else {
        state.error = 'An unknown error occurred';
      }
      state.isLoading = false;
      state.orderNumber = null;
    });
  },
});

export const {resetOrderNumber} = orderDetailsSlice.actions;
export const selectOrderNumber = (state: RootState) => state.orderDetails.orderNumber;
export const selectIsLoading = (state: RootState) => state.orderDetails.isLoading;