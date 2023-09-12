import React, {forwardRef, useMemo} from "react";
import Ingredient from "../ingredient/ingredient";
import styles from "./category-section.module.css";
import PropTypes from 'prop-types';
import {ingredientShape} from "../../../utils/types";

export const CategorySection = forwardRef((props, ref) => {
    const CATEGORIES_TO_NAME = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинка'
    };

    const filteredIngredients = useMemo(() => {
        return Object.keys(props.ingredients)
            .filter(id => props.ingredients[id].type === props.category)
            .map(id => <Ingredient ingredient={props.ingredients[id]} key={id} />);
    }, [props.ingredients, props.category]);

    return (
        <section className={`mt-10 pl-4 pr-4`} ref={ref} id={props.category}>
            <h2 className={`text text_type_main-medium`}>
                {CATEGORIES_TO_NAME[props.category] || "Неизвестная категория"}
            </h2>
            <ul className={styles.category_ingredient_list}>
                {filteredIngredients}
            </ul>
        </section>
    );
});

CategorySection.propTypes = {
    category: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
};