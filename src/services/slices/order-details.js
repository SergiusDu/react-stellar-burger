import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

export const fetchOrder = createAsyncThunk('orderDetails/sendOrder', async (orderData, {rejectWithValue}) => {
    try {
        const response = await fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                ingredients: orderData
            })
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }


})
export const orderDetails = createSlice({
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

export const {resetOrderNumber} = orderDetails.actions;
export const selectOrderNumber = state => state.orderDetails.orderNumber;