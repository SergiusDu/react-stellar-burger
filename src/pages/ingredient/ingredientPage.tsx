import styles from './ingredient.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import {
    closeModal,
    resetSelectedIngredient,
    selectedIngredient,
    selectIngredients,
    setSelectedIngredient,
} from '../../services/slices/ingredient-slice';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {IngredientType} from '../../utils/types';

export interface MatchParams {
    id: string;
}

export interface IngredientProps extends RouteComponentProps<MatchParams> {
}

export const IngredientPage: React.FC<IngredientProps> = ({match}) => {
    const {id} = match.params;
    const dispatch = useDispatch();
    const ingredients: IngredientType[] = useSelector(selectIngredients);
    const ingredient: IngredientType = useSelector(selectedIngredient);
    useEffect(() => {
        const foundedIngredient = ingredients.find(e => e._id === id);
        if (foundedIngredient) {
            dispatch(setSelectedIngredient(foundedIngredient));
        }
        return () => {
            dispatch(closeModal());
            dispatch(resetSelectedIngredient());
        };
    }, [ingredients, id, dispatch]);
    return ingredient && (<main className={styles.ingredientLayout}>
            <IngredientDetails />
        </main >);
};
