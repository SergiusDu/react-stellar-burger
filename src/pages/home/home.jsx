import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients
    from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor
    from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    closeModal,
    resetSelectedIngredient,
    selectIsModalOpen,
} from '../../services/slices/ingredient-slice';
import {
    resetOrderNumber,
    selectOrderNumber,
} from '../../services/slices/order-details-slice';
import styles from '../home/home.module.css';
import {useHistory} from 'react-router-dom';

export default function Home() {
  const isLoading = useSelector((state) => state.ingredient.isLoading);
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(
    state => state.ingredient.selectedIngredient);
  const orderNumber = useSelector(selectOrderNumber);
  const history = useHistory();
  const isModalOpen = useSelector(selectIsModalOpen);
  useEffect(() => {
    // Функция для проверки, должно ли быть открыто модальное окно
    const unlisten = history.listen((location, action) => {
      if (action === 'POP' && isModalOpen) {
        // Если действие - это возврат назад и модальное окно открыто,
        // то закрываем модальное окно
        dispatch(resetSelectedIngredient());
        dispatch(closeModal());
      }
    });

    // Отменяем подписку на изменения истории при размонтировании компонента
    return () => {
      unlisten();
    };
  }, [isModalOpen, dispatch, history]);
  const handleCloseOrderDetails = () => {
    dispatch(resetOrderNumber());
  };
  return (
    <main className={styles.main_layout}>
      <DndProvider backend={HTML5Backend}>
        {isLoading ?
          <div >Loading</div > :
          (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        {orderNumber && <Modal
          onClose={handleCloseOrderDetails}
          title={`Детали заказа`}
        >
          <OrderDetails />
        </Modal >}
      </DndProvider >
    </main >
  );
}

