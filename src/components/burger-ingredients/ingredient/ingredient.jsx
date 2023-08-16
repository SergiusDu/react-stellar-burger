import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import {useIngredient} from "../../context-providers/ingredient-context.jsx";
import PropTypes from 'prop-types';

export default function Ingredient({ingredient}) {
  const {setSelectedIngredient} = useIngredient();

  return (<li className={`mt-6 ml-4 mr-6 ${styles.ingredient}`}
              onClick={() => setSelectedIngredient(ingredient)}
  >
    <figure className={styles.ingredient__figure}>
      <Counter count={1}
               size="default"/>
      <picture className={styles.ingredient_picture}>
        <source media="(min-width: 1000px)"
                srcSet={ingredient.image_large}/>
        <source media="(min-width: 600px)"
                srcSet={ingredient.image_mobile}/>
        <img alt={ingredient.name}
             src={ingredient.image}
             className={`ml-4 mr-4 mb-1 ${styles.ingredient__image}`}/>
      </picture>
      <figcaption className={`mt-1 mb-1 ${styles.ingredient__figure_caption}`}>
        <div className={`mt-1 mb-1 ${styles.ingredient__price}`}>
          <p className={`text text_type_digits-default`}>{ingredient.price} </p>
          <CurrencyIcon type={"primary"}/>
        </div>
        <h2 className={`text text_type_main-default`}>
          {ingredient.name}
        </h2>
      </figcaption>
    </figure>
  </li>);
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
  }).isRequired
};