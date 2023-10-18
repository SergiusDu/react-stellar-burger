import AppHeader from "../../components/app-header/app-header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients, resetSelectedIngredient} from "../../services/slices/ingredient-slice";
import {resetOrderNumber, selectOrderNumber} from "../../services/slices/order-details-slice";
import styles from "../home/home.module.css";

export default function Home() {
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
    <>
      <AppHeader/>
      <main className={styles.main_layout}>
        <DndProvider backend={HTML5Backend}>
          {isLoading ? <div>Loading</div> : (
            <>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </>
          )}
          {selectedIngredient &&
            <Modal onClose={handleCloseIngredientDetails}
                   title={`Детали ингредиента`}>
              <IngredientDetails/>
            </Modal>}
          {orderNumber &&
            <Modal onClose={handleCloseOrderDetails}
                   title={`Детали ингредиента`}>
              <OrderDetails/>
            </Modal>}
        </DndProvider>
      </main>
    </>
  )
}

