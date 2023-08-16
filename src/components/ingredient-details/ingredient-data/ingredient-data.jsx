import React from "react";
import styles from "./ingredient-data.module.css"
import PropTypes from 'prop-types';

export default function IngredientData(ingredientData) {
  return (
    <div className={`mr-5 text_type_main-default text text_color_inactive ${styles.ingredient_data}`}>
      <dt>{ingredientData.name}</dt>
      <dd className={`text_type_digits-default`}>{ingredientData.description}</dd>
    </div>
  )
}



IngredientData.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};