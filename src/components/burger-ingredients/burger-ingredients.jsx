import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
import styles from "./burger-ingredients.module.css"
import PropTypes from 'prop-types';



export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('buns');
  const containerRef = React.useRef(null);

  function handleTabClick(value) {
    setCurrent(value);
    const element = containerRef.current.querySelector(`#${value}`);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (<>
    <section className={`mr-5 ${styles.burger_ingredients}`}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div style={{display: 'flex'}}>
        <Tab active={current === 'bun'} value={'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab active={current === 'sauce'} value={'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab active={current === 'main'} value={'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <IngredientList ingredients={props.ingredients} ref={containerRef}/>
    </section>
  </>)
}


BurgerIngredients.propTypes = {
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