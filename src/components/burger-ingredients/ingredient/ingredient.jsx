import React, {useCallback} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {setSelectedIngredient} from "../../../services/slices/ingredient-slice";
import {ingredientShape} from "../../../utils/types";
import {useHistory} from 'react-router-dom';

export default function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = useCallback(() => {
    dispatch(setSelectedIngredient(ingredient));
    history.push(`/ingredient/${ingredient._id}`)
  }, [dispatch, ingredient]);

  const [, ref] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
      <li ref={ref} className={`mt-6 ml-4 mr-6 ${styles.ingredient}`} onClick={handleClick} draggable>
        <figure className={styles.ingredient__figure}>
          {ingredient.count && <Counter count={ingredient.count} size="default" />}
          <picture className={styles.ingredient_picture}>
            <source media="(min-width: 1000px)" srcSet={ingredient.image_large} />
            <source media="(min-width: 600px)" srcSet={ingredient.image_mobile} />
            <img alt={ingredient.name} src={ingredient.image} className={`ml-4 mr-4 mb-1 ${styles.ingredient__image}`} />
          </picture>
          <figcaption className={`mt-1 mb-1 ${styles.ingredient__figure_caption}`}>
            <div className={`mt-1 mb-1 ${styles.ingredient__price}`}>
              <p className={`text text_type_digits-default`}>{ingredient.price} </p>
              <CurrencyIcon type={"primary"} />
            </div>
            <h2 className={`text text_type_main-default`}>
              {ingredient.name}
            </h2>
          </figcaption>
        </figure>
      </li>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientShape.isRequired,
};
