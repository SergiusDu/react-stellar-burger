import React, {useEffect} from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients, resetSelectedIngredient} from "../../services/slices/ingredient-slice";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import {resetOrderNumber, selectOrderNumber} from "../../services/slices/order-details";


function App() {
    const isLoading = useSelector((state) => state.ingredient.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const selectedIngredient = useSelector(state => state.ingredient.selectedIngredient);
    const orderNumber = useSelector(selectOrderNumber)
    const handleCloseIngredientDetails = () => {
        dispatch(resetSelectedIngredient());
    };
    const handleCloseOrderDetails = () => {
        dispatch(resetOrderNumber());
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main_layout}>
                <DndProvider backend={HTML5Backend}>
                            {isLoading ? <div>Loading</div> : (
                                <>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </>
                            )}
                            {
                                selectedIngredient &&
                                <Modal onClose={handleCloseIngredientDetails}
                                       title={`Детали ингредиента`}>
                                    <IngredientDetails />
                                </Modal>
                            }
                            {
                                orderNumber &&
                                <Modal onClose={handleCloseOrderDetails}
                                       title={`Детали ингредиента`}>
                                    <OrderDetails />
                                </Modal>
                            }
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
