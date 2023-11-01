import AppHeader from '../../components/app-header/app-header';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeModal,
  fetchIngredients,
  resetSelectedIngredient,
  selectIsModalOpen,
} from '../../services/slices/ingredient-slice';
import {resetOrderNumber, selectOrderNumber} from '../../services/slices/order-details-slice';
import styles from '../home/home.module.css';
import {useHistory} from 'react-router-dom';
import {MAIN_PAGE_PATH} from '../../utils/constants';

export default function Home() {
    const isLoading = useSelector((state) => state.ingredient.isLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const selectedIngredient = useSelector(state => state.ingredient.selectedIngredient);
    const orderNumber = useSelector(selectOrderNumber);
    const history = useHistory();
    const isModalOpen = useSelector(selectIsModalOpen);
    useEffect(() => {
        // Функция для проверки, должно ли быть открыто модальное окно
        const unlisten = history.listen((location, action) => {
            if (action === 'POP' && isModalOpen) {
                // Если действие - это возврат назад и модальное окно открыто,
                // то закрываем модальное окно
                dispatch(resetSelectedIngredient())
                dispatch(closeModal());
            }
        });

        // Отменяем подписку на изменения истории при размонтировании компонента
        return () => {
            unlisten();
        };
    }, [isModalOpen, dispatch, history]);
    const handleCloseIngredientDetails = () => {
        dispatch(resetSelectedIngredient());
        dispatch(closeModal());
        history.push(MAIN_PAGE_PATH);
    };
    const handleCloseOrderDetails = () => {
        dispatch(resetOrderNumber());
    };
    return (<>
            <AppHeader />
            <main className={styles.main_layout}>
                <DndProvider backend={HTML5Backend}>
                    {isLoading ? <div >Loading</div > : (<>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </>)}
                    {selectedIngredient && <Modal
                        onClose={handleCloseIngredientDetails}
                        title={`Детали ингредиента`}
                    >
                        <IngredientDetails />
                    </Modal >}
                    {orderNumber && <Modal
                        onClose={handleCloseOrderDetails}
                        title={`Детали заказа`}
                    >
                        <OrderDetails />
                    </Modal >}
                </DndProvider >
            </main >
        </>);
}

