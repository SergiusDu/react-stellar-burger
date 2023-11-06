import React, {ForwardedRef, useMemo} from 'react';
import styles from './ingredient-list.module.css';
import {CategorySection} from '../category-section/category-section';
import {selectIngredients} from '../../../services/slices/ingredient-slice';
import {useSelector} from 'react-redux';
import {IngredientType} from '../../../utils/types';

type IngredientListProps = {
    refs?: Record<string, ForwardedRef<HTMLElement>>;
};
const IngredientList = React.forwardRef<HTMLElement, IngredientListProps>((props, ref: React.ForwardedRef<HTMLElement>) => {
    const ingredients: IngredientType[] = useSelector(selectIngredients);
    const uniqueCategories = useMemo(() => {
        const uniqueTypes = new Set<string>();
        Object.values(ingredients).forEach(ingredient => {
            if (ingredient?.type) uniqueTypes.add(ingredient.type);
        });
        return Array.from(uniqueTypes);
    }, [ingredients]);
    return (<section
        className={`mt-10 ${styles.category_ingredient_list}`}
        ref={ref}
    >
        {uniqueCategories.map(category => (<CategorySection
            key={category}
            category={category}
            ingredients={ingredients}
            ref={props.refs ? props.refs[category] : null}
        />))}
    </section >);
});

export default IngredientList;

