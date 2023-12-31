import React, {useCallback} from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import {useDrag} from 'react-dnd';
import {setSelectedIngredient} from '../../../services/slices/ingredient-slice';
import {useHistory, useLocation} from 'react-router-dom';
import {IngredientType} from '../../../utils/types';
import {useAppDispatch} from '../../../utils/hooks/reduxHooks';

export type IngredientProps = {
  ingredient: IngredientType;
};
const Ingredient: React.FC<IngredientProps> = ({ingredient}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const handleClick = useCallback(() => {
    dispatch(setSelectedIngredient(ingredient));
    history.push({
      pathname: `/ingredient/${ingredient._id}`,
      state: {background: location},

    });
  }, [dispatch, ingredient, history, location]);

  const [, ref] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li
      ref={ref}
      className={`mt-6 ml-4 mr-6 ${styles.ingredient}`}
      onClick={handleClick}
      draggable
    >
      <figure className={styles.ingredient__figure}>
        {ingredient.count && <Counter
          count={ingredient.count}
          size="default"
        />}
        <picture className={styles.ingredient_picture}>
          <source
            media="(min-width: 1000px)"
            srcSet={ingredient.image_large}
          />
          <source
            media="(min-width: 600px)"
            srcSet={ingredient.image_mobile}
          />
          <img
            alt={ingredient.name}
            src={ingredient.image}
            className={`ml-4 mr-4 mb-1 ${styles.ingredient__image}`}
          />
        </picture >
        <figcaption className={`mt-1 mb-1 ${styles.ingredient__figure_caption}`}>
          <div className={`mt-1 mb-1 ${styles.ingredient__price}`}>
            <p className={`text text_type_digits-default`}>{ingredient.price} </p >
            <CurrencyIcon type={'primary'} />
          </div >
          <h2 className={`text text_type_main-default`}>
            {ingredient.name}
          </h2 >
        </figcaption >
      </figure >
    </li >
  );
};
export default Ingredient;