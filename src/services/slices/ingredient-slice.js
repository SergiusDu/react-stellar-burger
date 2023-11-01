import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '../../utils/types';
import fetchAPI from '../../utils/api';

const DATA_URL = `${BASE_URL}/ingredients`;
export const fetchIngredients = createAsyncThunk('ingredient/fetchIngredients', async (_, {rejectWithValue}) => {
    try {
        return await fetchAPI(DATA_URL);
    } catch (error) {
        return rejectWithValue(`Ошибка, ${error}`);
    }
});

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: {
        ingredients: [],
        isLoading: false,
        error: null,
        defaultBunSet: false,
        selectedIngredient: null,
        isModalOpen: false,
    },
    reducers: {
        setSelectedIngredient: (state, action) => {
            state.selectedIngredient = action.payload;
        },
        resetSelectedIngredient: (state) => {
            state.selectedIngredient = null;
        },
        fetchIngredientStart: state => {
            state.isLoading = true;
        },
        fetchIngredientSuccess: (state, action) => {
            state.ingredients = action.payload;
            state.isLoading = false;
        },
        fetchIngredientFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        increaseIngredientAmount: (state, action) => {
            const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
            if (index === -1) {
                return state;
            }
            if (typeof state.ingredients[index].count === 'number') {
                state.ingredients[index].count += 1;
            } else {
                state.ingredients[index].count = 1;
            }
        },
        decreaseIngredientAmount: (state, action) => {
            const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
            if (index === -1) {
                return state;
            }
            if (state.ingredients[index].count > 1) {
                state.ingredients[index].count -= 1;
            } else {
                delete state.ingredients[index].count;
            }
        },
        resetAllIngredientAmount: (state) => {
            state.ingredients.forEach((ingredient, index) => {
                if ('count' in ingredient) {
                    delete state.ingredients[index].count;
                }
            });
        },
        setBunCount: (state, action) => {
            const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
            if (index === -1) {
                console.warn('Ingredient not found');
                return;
            }
            const oldBunIndex = state.ingredients.findIndex(ingredient => ingredient.type === 'bun' && ingredient.count > 0);
            if (oldBunIndex !== -1) {
                delete state.ingredients[oldBunIndex].count;
            }
            state.ingredients[index].count = 1;
        },
        openModal: state => {
            state.isModalOpen = true;
        },
        closeModal: state => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
            state.isLoading = false;
            state.error = null;
        }).addCase(fetchIngredients.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.ingredients = [];
            state.defaultBunSet = false;
            state.selectedIngredient = null;
        });
    },
});

export const selectIngredients = (state) => state.ingredient.ingredients;
export const selectedIngredient = state => state.ingredient.selectedIngredient;
export const selectIsModalOpen = state => state.ingredient.isModalOpen;
export const {
    increaseIngredientAmount,
    decreaseIngredientAmount,
    resetAllIngredientAmount,
    setBunCount,
    setSelectedIngredient,
    resetSelectedIngredient,
    openModal,
    closeModal,
} = ingredientSlice.actions;