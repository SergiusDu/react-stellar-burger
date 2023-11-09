import { configureStore } from "@reduxjs/toolkit";
import { ingredientSlice } from "../slices/ingredient-slice";
import { burgerConstructorSlice } from "../slices/burger-constructor-slice";
import { orderDetailsSlice } from "../slices/order-details-slice";
import { loginSlice } from "../slices/login-form-slice";
import { registrationSlice } from "../slices/registration-form-slice";
import { forgotPasswordFormSlice } from "../slices/forgot-password-slice";
import { resetPasswordFormSlice } from "../slices/reset-password-slice";
import { profileSlice } from "../slices/profile-slice";
import {websocketMiddleware} from '../middleware/websocketMiddleware';
import {feedSlice} from '../slices/feed-slice';

/**
 * Главное хранилище приложения.
 * Оно объединяет редьюсеры из различных срезов (slices), каждый из которых отвечает за свою часть общего состояния приложения.
 */
export const store = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    loginData: loginSlice.reducer,
    registrationFormData: registrationSlice.reducer,
    forgotPasswordForm: forgotPasswordFormSlice.reducer,
    resetPasswordForm: resetPasswordFormSlice.reducer,
    profilePage: profileSlice.reducer,
    feedSlice: feedSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
