import {configureStore} from "@reduxjs/toolkit";
import {ingredientSlice} from "../slices/ingredient-slice";
import {burgerConstructorSlice} from "../slices/burger-constructor-slice";
import {orderDetails} from "../slices/order-details";


export const store = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    orderDetails: orderDetails.reducer
  }
})

export default store;