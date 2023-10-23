import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {
    fetchIngredients, selectedIngredient, selectIngredients, setSelectedIngredient
} from "../../services/slices/ingredient-slice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import AppHeader from "../../components/app-header/app-header";

export function Ingredient({match}) {
    const {id} = match.params;
    const dispatch = useDispatch();
    const ingredients = useSelector(selectIngredients);
    const ingredient = useSelector(selectedIngredient);
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);
    useEffect(() => {
        const foundedIngredient = ingredients.find(e => e._id === id);
        if (foundedIngredient) {
            dispatch(setSelectedIngredient(foundedIngredient));
        }
    }, [ingredients, id, dispatch])
    return (<>
        <AppHeader/>
        {ingredient && <main className={styles.ingredientLayout}>
            <IngredientDetails/>
        </main>}
    </>)
}
