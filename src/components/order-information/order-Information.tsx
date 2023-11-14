import React, {useEffect, useMemo, useState} from 'react';
import {isValidIngredient, MatchParams, Order} from '../../utils/types';
import {RouteComponentProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAllOrders, selectOrders} from '../../services/slices/feed-slice';
import {selectIngredients} from '../../services/slices/ingredient-slice';
import {getUniqueIdsWithCount, translateOrderStatus} from '../../utils/api';
import {
  CurrencyIcon, FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-information.module.css';
import {
  RoundedIngredientImage,
} from '../rounded-ingredient-image/rounded-ingredient-image';

interface OrderProps extends RouteComponentProps<MatchParams> {
}

export const OrderInformation: React.FC<OrderProps> = ({match}) => {
  const {id} = match.params;
  const allOrders = useSelector(selectAllOrders);
  const ingredients = useSelector(selectIngredients);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(0);
  useEffect(() => {
    const foundedOrder = allOrders.find(order => order._id === id);
    if (foundedOrder) {
      setSelectedOrder(foundedOrder);
    }
  }, [allOrders, id]);
  const ingredientELements = useMemo(() => {
    let result: JSX.Element[] = [];
    let orderIngredients = selectedOrder?.ingredients;
    if (!orderIngredients || !ingredients) {
      return result;
    }
    const ingredientsCounter: Record<string, number> = getUniqueIdsWithCount(
      orderIngredients);
    let orderPrice = 0;
    for (const [key, value] of Object.entries(ingredientsCounter)) {
      const currentIngredient = ingredients.find(i => i._id === key);
      if (!isValidIngredient(currentIngredient)) {
        return;
      }
      orderPrice += currentIngredient.price * value;
      result.push(<li
        key={key}
        className={styles.row}
      >
        <RoundedIngredientImage
          src={currentIngredient.image}
          name={currentIngredient.name}
        />
        <div className={styles.nameAndPrice}>
          <p className="text text_type_main-default ml-4 mr-4">{currentIngredient.name}</p >
          <p className={`text text_type_digits-default ${styles.price}`}>{value} x {currentIngredient.price}
            <CurrencyIcon type="primary" />
          </p >
        </div >

      </li >);
    }
    setTotalPrice(orderPrice);
    return result;
  }, [selectedOrder, ingredients]);
  return (
    selectedOrder && <main className={`${styles.orderInformation} mt-15 mb-15`}>
      <p className={`text text_type_digits-default ${styles.orderNumber}`}>#{selectedOrder.number}</p >
      <h2 className={`text text_type_main-medium mt-10`}>
        {selectedOrder.name}
      </h2 >
      <p className={`text text_type_main-small mt-3 ${selectedOrder.status === 'done'? 'text_color_success' : null}`}>
        {translateOrderStatus(selectedOrder.status)}
      </p >
      <h3 className="text text_type_main-medium mt-15 mb-6">
        Состав:
      </h3 >
      <ul className={`${styles.scrollable_container} pr-24`}>
        {ingredientELements}
      </ul >
      <div className={`${styles.row} mt-10`}>
        <FormattedDate
          className="text text_type_main-small text_color_inactive"
          date={new Date(selectedOrder.createdAt)}
        />
        <p className={`text text_type_digits-default ${styles.price}`}>{totalPrice}
          <CurrencyIcon type="primary" /></p >
      </div >
    </main >
  );
};