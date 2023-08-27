import React, { useMemo } from "react";
import styles from "./ingredient-list.module.css"
import { CategorySection } from "../category-section/category-section";
import PropTypes from 'prop-types';
import { ingredientShape } from "../../../utils/types";

const IngredientList = React.forwardRef((props, ref) => {

    const uniqueCategories = useMemo(() => {
        const uniqueTypes = new Set();
        Object.values(props.ingredients).forEach(ingredient => {
            uniqueTypes.add(ingredient.type);
        });
        return Array.from(uniqueTypes);
    }, [props.ingredients]);

    return (
        <section className={`mt-10 ${styles.category_ingredient_list}`} ref={ref}>
            {uniqueCategories.map(category => (
                <CategorySection
                    key={category}
                    category={category}
                    ingredients={props.ingredients}
                    ref={props.refs ? props.refs[category] : null}
                />
            ))}
        </section>
    );
});

export default IngredientList;

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
};
