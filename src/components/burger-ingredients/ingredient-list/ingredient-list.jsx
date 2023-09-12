import React, {useMemo} from "react";
import styles from "./ingredient-list.module.css"
import {CategorySection} from "../category-section/category-section";
import {selectIngredients} from "../../../services/slices/ingredient-slice";
import {useSelector} from "react-redux";

const IngredientList = React.forwardRef((props, ref) => {
    const ingredients = useSelector(selectIngredients);
    const uniqueCategories = useMemo(() => {
        const uniqueTypes = new Set();
        Object.values(ingredients).forEach(ingredient => {
            uniqueTypes.add(ingredient.type);
        });
        return Array.from(uniqueTypes);
    }, [ingredients]);

    return (
        <section className={`mt-10 ${styles.category_ingredient_list}`} ref={ref}>
            {uniqueCategories.map(category => (
                <CategorySection
                    key={category}
                    category={category}
                    ingredients={ingredients}
                    ref={props.refs ? props.refs[category] : null}
                />
            ))}
        </section>
    );
});

export default IngredientList;

