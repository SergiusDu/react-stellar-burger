import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchAPI, {getAccessTokenFromCookies, getRefreshTokenFromCookies} from '../../utils/api';
import {ORDER_URL, POST_METHOD} from '../../utils/constants';
import {refreshAccessToken} from './profile-slice';

export const fetchOrder = createAsyncThunk('orderDetails/sendOrder',
    async (orderData, { dispatch, rejectWithValue }) => {
      let authToken = getAccessTokenFromCookies();

      const sendRequestWithToken = async (token) => {
        try {
          const response = await fetchAPI(
              ORDER_URL, POST_METHOD, { ingredients: orderData }, { Authorization: token }
          );

          // Проверяем, был ли ответ преобразован в JSON и содержит ли он поле order с полем number
          if (response.order && response.order.number) {
            return response;
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
          // Если fetchAPI выбросил исключение, мы его здесь перехватываем
          if (error.name === 'AbortError') {
            return rejectWithValue('Request was aborted');
          }
          if (error.message === 'Failed to fetch') {
            return rejectWithValue('Network request failed');
          }
          return rejectWithValue(error.message);
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
      return sendRequestWithToken(authToken)
      .catch(async (error) => {
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