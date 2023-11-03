import styles from './ingredient.module.css';
import IngredientDetails
    from '../../components/ingredient-details/ingredient-details';
import {
    closeModal,
    resetSelectedIngredient,
    selectedIngredient,
    selectIngredients,
    setSelectedIngredient,
} from '../../services/slices/ingredient-slice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

export function Ingredient({match}) {
  const {id} = match.params;
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const ingredient = useSelector(selectedIngredient);
  useEffect(() => {
    const foundedIngredient = ingredients.find(e => e._id === id);
    if (foundedIngredient) {
      dispatch(setSelectedIngredient(foundedIngredient));
    }
    return () => {
      dispatch(closeModal());
      dispatch(resetSelectedIngredient());
    };
  }, [ingredients, id, dispatch]);
  return ingredient && (
    <main className={styles.ingredientLayout}>
      <IngredientDetails />
    </main >
  );
}
