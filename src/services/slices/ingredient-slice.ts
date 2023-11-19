import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAPI} from '../../utils/api';
import {GET_INGREDIENTS_ENDPOINT, GET_METHOD} from '../../utils/constants';
import {RootState} from '../store/store';
import {IngredientType} from '../../utils/types';

/**
 * Асинхронный экшен для загрузки ингредиентов.
 */
export const fetchIngredients = createAsyncThunk('ingredient/fetchIngredients', async (_, {rejectWithValue}) => {
  try {
    const response: IngredientType[] = await fetchAPI(GET_INGREDIENTS_ENDPOINT, GET_METHOD);
    return response;
  } catch (error: any) {
    return rejectWithValue(`Ошибка,  ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

interface IngredientState {
  ingredients: IngredientType[];
  isLoading: boolean;
  error: string | null | undefined;
  defaultBunSet: boolean;
  selectedIngredient: IngredientType | null;
  isModalOpen: boolean;
}

const initialState: IngredientState = {
  ingredients: [], isLoading: false, error: null, defaultBunSet: false, selectedIngredient: null, isModalOpen: false,
};
/**
 * Срез состояния ингредиентов.
 */
export const ingredientSlice = createSlice({
  name: 'ingredient', initialState, reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    }, resetSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    }, fetchIngredientStart: state => {
      state.isLoading = true;
    }, fetchIngredientSuccess: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }, fetchIngredientFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }, increaseIngredientAmount: (state, action) => {
      const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
      if (index !== -1) {
        state.ingredients[index].count = (state.ingredients[index].count || 0) + 1;
      }
    }, decreaseIngredientAmount: (state, action) => {
      const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
      if (index !== -1 && typeof state.ingredients[index].count === 'number') {
        if (state.ingredients[index].count! > 1) {
          state.ingredients[index].count! -= 1;
        } else {
          delete state.ingredients[index].count;
        }
      }
    }, resetAllIngredientAmount: (state) => {
      state.ingredients.forEach((ingredient, index) => {
        if ('count' in ingredient) {
          delete state.ingredients[index].count;
        }
      });
    }, setBunCount: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
      if (index === -1) {
        console.warn('Ingredient not found');
        return;
      }
      const oldBunIndex = state.ingredients.findIndex(
        ingredient => ingredient.type === 'bun' && (ingredient.count ?? 0) > 0);
      if (oldBunIndex !== -1) {
        delete state.ingredients[oldBunIndex].count;
      }
      state.ingredients[index].count = 1;
    }, openModal: state => {
      state.isModalOpen = true;
    }, closeModal: state => {
      state.isModalOpen = false;
    },
  }, extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
      state.error = null;
    }).addCase(fetchIngredients.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
      state.ingredients = [];
      state.defaultBunSet = false;
      state.selectedIngredient = null;
    });
  },
});

export const selectIngredients = (state: RootState) => state.ingredient.ingredients;
export const selectedIngredient = (state: RootState) => state.ingredient.selectedIngredient;
export const selectIsModalOpen = (state: RootState) => state.ingredient.isModalOpen;
export const selectIsLoading = (state: RootState) => state.ingredient.isLoading;
export const {
  increaseIngredientAmount, decreaseIngredientAmount, resetAllIngredientAmount, setBunCount, setSelectedIngredient, resetSelectedIngredient, openModal, closeModal,
} = ingredientSlice.actions;