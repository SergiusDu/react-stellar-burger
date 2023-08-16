import React from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./category-section.module.css";
import PropTypes from 'prop-types';

export default function CategorySection(props) {
  const CATEGORIES_TO_NAME = {
    bun: 'Булки', sauce: 'Соусы', main: 'Начинка'
  }
  return (
    <section className={`mt-10 pl-4 pr-4`}>
      <h2 className={`text text_type_main-medium`} id={props.category}>{CATEGORIES_TO_NAME[props.category]}</h2>
      <ul className={styles.category_ingredient_list}>
        {props.ingredients.filter(ingredient => ingredient.type === props.category).map(filteredIngredient => {
          return <Ingredient ingredient={filteredIngredient}
                             key={filteredIngredient._id}
          />
        })}
      </ul>
    </section>)
}

CategorySection.propTypes = {
  category: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
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
      image_large: PropTypes.string.isRequired,
    })
  ).isRequired,
};