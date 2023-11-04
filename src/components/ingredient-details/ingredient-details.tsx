import React from 'react';
import styles from './ingredient-details.module.css';
import IngredientData from './ingredient-data/ingredient-data';
import {useSelector} from 'react-redux';
import {selectedIngredient} from '../../services/slices/ingredient-slice';
import {IngredientType} from '../../utils/types';


export const IngredientDetails: React.FC = () => {
    const ingredient : IngredientType = useSelector(selectedIngredient);
    return (<figure className={styles.ingredient_details}>
        <picture >
            <source
                media="(min-width: 1000px)"
                srcSet={ingredient.image_large}
            />
            <source
                media="(min-width: 600px)"
                srcSet={ingredient.image_mobile}
            />
            <img
                className={`mb-4 ${styles.ingredient_image}`}
                src={ingredient.image}
                alt={ingredient.name}
            />
        </picture >
        <figcaption >
            <h2 className={`text text_type_main-medium ${styles.ingredient_name}`}>{ingredient.name}</h2 >
            <dl className={`mt-8 mb-15 ${styles.ingredient_composition}`}>
                <IngredientData
                    name={'Калории,ккал'}
                    description={ingredient.calories}
                />
                <IngredientData
                    name={'Белки, г'}
                    description={ingredient.proteins}
                />
                <IngredientData
                    name={'Жиры, г'}
                    description={ingredient.fat}
                />
                <IngredientData
                    name={'Углеводы, г'}
                    description={ingredient.carbohydrates}
                />
            </dl >
        </figcaption >
    </figure >);
};

export default IngredientDetails;