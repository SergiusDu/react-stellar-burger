import {configureStore} from "@reduxjs/toolkit";
import {ingredientSlice} from "../slices/ingredient-slice";
import {burgerConstructorSlice} from "../slices/burger-constructor-slice";
import {orderDetailsSlice} from "../slices/order-details-slice";
import {loginSlice} from "../slices/login-form-slice";
import {registrationSlice} from "../slices/registration-form-slice";
import {forgotPasswordFormSlice} from "../slices/forgot-password-slice";


export const store = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    loginData: loginSlice.reducer,
    registrationFormData: registrationSlice.reducer,
    forgotPasswordForm: forgotPasswordFormSlice.reducer
  }
})

export default store;