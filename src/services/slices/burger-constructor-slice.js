import { createSlice } from "@reduxjs/toolkit";

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        ingredients: [],
        bun: null,
    },
    reducers: {
        addIngredient: (state, action) => {
            const uniqueId = Date.now();
            state.ingredients.push({ ...action.payload, uniqueId });
        },
        removeIngredient: (state, action) => {
            const index = state.ingredients.findIndex(ingredient => ingredient.uniqueId === action.payload);
            if (index > -1) {
                state.ingredients.splice(index, 1);
            } else {
                console.error(`Ингридиент с uniqueId ${action.payload} не найден.`);
            }
        },
        setBun: (state, action) => {
            state.bun = action.payload;
        },
        moveItem: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const [moved] = state.ingredients.splice(fromIndex, 1);
            state.ingredients.splice(toIndex, 0, moved);
        },
        resetIngredients: (state) => {
            state.ingredients = [];
        }
    }
});

export const selectIngredients = (state) => state.burgerConstructor.ingredients;
export const selectSum = (state) => state.burgerConstructor.sum;
export const { addIngredient, moveItem, removeIngredient, setBun , resetIngredients} = burgerConstructorSlice.actions;
