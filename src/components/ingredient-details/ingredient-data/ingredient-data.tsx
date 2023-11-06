import React from 'react';
import styles from './ingredient-data.module.css';

interface IngredientDataProps {
    name: string;
    description: string | number;
}

const IngredientData: React.FC<IngredientDataProps> = (ingredientData) => {
    return (<div className={`mr-5 text_type_main-default text text_color_inactive ${styles.ingredient_data}`}>
            <dt >{ingredientData.name}</dt >
            <dd className={`text_type_digits-default`}>{ingredientData.description}</dd >
        </div >);
};

export default IngredientData;