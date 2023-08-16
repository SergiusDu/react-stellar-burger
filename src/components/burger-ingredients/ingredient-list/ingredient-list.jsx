import React from "react";
import styles from "./ingredient-list.module.css"
import CategorySection from "../category-section/category-section";
import PropTypes from 'prop-types';

const IngredientList = React.forwardRef((props, ref) => {
  function getUniqueCategories() {
    return [...new Set(props.ingredients.map((ingredient) => ingredient.type))];
  }

  return (
    <section className={`mt-10 ${styles.category_ingredient_list}`} ref={ref}>
    {getUniqueCategories().map(category => {
      return <CategorySection key={category} category={category} ingredients={props.ingredients} />
    })}
  </section>
  )
});

export default IngredientList;




IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired
};