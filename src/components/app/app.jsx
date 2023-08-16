import React, {useEffect, useState} from 'react'
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {IngredientProvider} from "../context-providers/ingredient-context";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import OrderContextProvider from "../context-providers/order_details_context";

function App() {
    const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function getIngredients() {

        fetch(DATA_URL).then((response) => response.json())
            .then(data => {
                setIngredients(data.data)
                setIsLoading(false)
            })
            .catch(() => {
                console.log('Не удалось получить данные с сервера.')
                setIsLoading(true)
            })
    }

    useEffect(() => {
        getIngredients();
    }, []);

    return (<div className={styles.app}>
        <AppHeader/>
        <section className={styles.main_layout}>
            <IngredientProvider>
                <OrderContextProvider>
                    {isLoading ? <div>Loading</div> : (
                      <>
                          <BurgerIngredients ingredients={ingredients}/>
                          <BurgerConstructor ingredients={ingredients}/>
                      </>
                     )}
                    <IngredientDetails/>
                    <OrderDetails/>
                </OrderContextProvider>
            </IngredientProvider>
        </section>
    </div>);
}

export default App;
