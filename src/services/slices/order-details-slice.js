import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/types";
import fetchAPI from "../../utils/api";

const ORDER_URL = `${BASE_URL}/orders`

export const fetchOrder = createAsyncThunk('orderDetails/sendOrder', async (orderData, {rejectWithValue}) => {
    try {
        const response = await fetchAPI(ORDER_URL, 'POST', {ingredients: orderData});

        if (response && response.order && response.order.number) {
            return response;
        } else {
            return rejectWithValue("Invalid response format");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const orderDetailsSlice = createSlice({
    name: 'burgerDetails', initialState: {
        isLoading: false,
        error: null,
        orderNumber: null,
    }, reducers: {
        resetOrderNumber: state => {
            state.orderNumber = null
        }
        ,
        fetchOrderStart: state => {
            state.isLoading = true;
        }, fetchOrderSuccess: (state, action) => {
            state.ingredients = action.payload;
            state.isLoading = false;
        }, fetchOrderFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true;
                state.orderNumber = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number;
                state.isLoading = false;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
                state.orderNumber = null;
            })
    }
})

export const {resetOrderNumber} = orderDetailsSlice.actions;
export const selectOrderNumber = state => state.orderDetails.orderNumber;