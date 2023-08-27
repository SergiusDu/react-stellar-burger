import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
export const fetchIngredients = createAsyncThunk('ingredient/fetchIngredients', async (_, {rejectWithValue}) => {
  const response = await fetch(DATA_URL);
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
  return rejectWithValue(`Ошибка, ${response.status}`)
})
export const ingredientSlice = createSlice({
  name: 'ingredient', initialState: {
    ingredients: [],
    isLoading: false,
    error: null,
    defaultBunSet: false,
    selectedIngredient: null
  }, reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    resetSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
    fetchIngredientStart: state => {
      state.isLoading = true;
    }, fetchIngredientSuccess: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }, fetchIngredientFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    increaseIngredientAmount: (state, action) => {
      const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
      if(index === -1) {
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
      if(index === -1) {
        return state;
      }
      if (state.ingredients[index].count > 1) {
        state.ingredients[index].count -= 1;
      } else {
        delete state.ingredients[index].count;
      }
    },
    setBunCount: (state, action) => {
      const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload);
      if (index === -1) {
        console.warn("Ingredient not found");
        return;
      }
      const oldBunIndex = state.ingredients.findIndex(ingredient =>  ingredient.type === 'bun' && ingredient.count > 0
      )
      if (oldBunIndex !== -1) {
        delete state.ingredients[oldBunIndex].count;
      }
      state.ingredients[index].count = 1;
    }
  }, extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = null; })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.ingredients = [];
        state.defaultBunSet = false;
        state.selectedIngredient = null;
      })
  }
})

export const {increaseIngredientAmount, decreaseIngredientAmount, setBunCount, setSelectedIngredient, resetSelectedIngredient} = ingredientSlice.actions;