import React, {useEffect} from 'react';
import styles from './ingredient-details.module.css';
import IngredientData from './ingredient-data/ingredient-data';
import {
  closeModal,
  resetSelectedIngredient,
  selectedIngredient,
  selectIngredients,
  setSelectedIngredient,
} from '../../services/slices/ingredient-slice';
import {IngredientType, MatchParams} from '../../utils/types';
import {RouteComponentProps} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxHooks';

interface IngredientDetailsProps extends RouteComponentProps<MatchParams> {
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({match}) => {
  const {id} = match.params;
  const dispatch = useAppDispatch();
  const ingredients: IngredientType[] = useAppSelector(selectIngredients);
  const ingredient: IngredientType | null = useAppSelector(selectedIngredient);
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
  return (
    ingredient && <figure className={styles.ingredient_details}>
      <picture >
        <source
          media="(min-width: 1000px)"
          srcSet={ingredient.image_large}
        />
        <source
          media="(min-width: 600px)"
          srcSet={ingredient.image_mobile}
        />
        <img
          className={`mb-4 ${styles.ingredient_image}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
      </picture >
      <figcaption >
        <h2 className={`text text_type_main-medium ${styles.ingredient_name}`}>{ingredient.name}</h2 >
        <dl className={`mt-8 mb-15 ${styles.ingredient_composition}`}>
          <IngredientData
            name={'Калории,ккал'}
            description={ingredient.calories}
          />
          <IngredientData
            name={'Белки, г'}
            description={ingredient.proteins}
          />
          <IngredientData
            name={'Жиры, г'}
            description={ingredient.fat}
          />
          <IngredientData
            name={'Углеводы, г'}
            description={ingredient.carbohydrates}
          />
        </dl >
      </figcaption >
    </figure >
  );
};

export default IngredientDetails;