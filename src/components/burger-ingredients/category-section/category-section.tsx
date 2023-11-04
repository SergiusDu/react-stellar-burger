import React, {forwardRef, useMemo} from 'react';
import Ingredient from '../ingredient/ingredient';
import styles from './category-section.module.css';
import {IngredientType} from '../../../utils/types';

export type CategorySectionProps = {
    category: string; ingredients: IngredientType[];
};

export const CategorySection = forwardRef<HTMLElement, CategorySectionProps>(({ingredients, category}, ref) => {
    const CATEGORIES_TO_NAME: Record<string, string> = {
        bun: 'Булки', sauce: 'Соусы', main: 'Начинка',
    };

    const filteredIngredients: React.ReactElement[] = useMemo(() => {
        return ingredients.filter(ingredient => ingredient.type === category).map(ingredient => {
            return (<Ingredient
                ingredient={ingredient}
                key={ingredient._id}
            />);
        });
    }, [ingredients, category]);

    return (<section
        className={`mt-10 pl-4 pr-4`}
        ref={ref}
        id={category}
    >
        <h2 className={`text text_type_main-medium`}>
            {CATEGORIES_TO_NAME[category] || 'Неизвестная категория'}
        </h2 >
        <ul className={styles.category_ingredient_list}>
            {filteredIngredients}
        </ul >
    </section >);
});
