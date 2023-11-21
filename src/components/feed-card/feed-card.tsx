import React, {MouseEventHandler, useEffect, useMemo, useState} from 'react';
import styles from './feed-card.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  BUN_TYPE,
  IngredientType,
  isValidIngredient,
  Order,
} from '../../utils/types';
import {selectIngredients} from '../../services/slices/ingredient-slice';
import {
  RoundedIngredientImage,
} from '../rounded-ingredient-image/rounded-ingredient-image';
import {translateOrderStatus} from '../../utils/api';
import {useAppSelector} from '../../utils/hooks/reduxHooks';

interface FeedCardProps {
  order: Order;
  onClick: MouseEventHandler<HTMLElement>;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  order,
  onClick,
}) => {
  const date = new Date(order.createdAt);
  const ingredients = useAppSelector(selectIngredients);
  const [burgerPrice, setBurgerPrice] = useState<number>(0);
  const [burgerIngredientsWithDetails, setBurgerIngredientsWithDetails] = useState<IngredientType[]>(
    []);
  useEffect(() => {
    function parseOrderData() {
      let price = 0;
      let ingredientsWithDetails: IngredientType[] = [];
      let ingredientDetails: IngredientType | undefined = undefined;
      for (const orderIngredientId of order.ingredients) {
        ingredientDetails =
          ingredients.find(ingredient => ingredient._id === orderIngredientId);
        if (!isValidIngredient(ingredientDetails)) {
          continue;
        }
        price += ingredientDetails.price;
        ingredientsWithDetails.push(ingredientDetails);
      }
      setBurgerPrice(price);
      setBurgerIngredientsWithDetails(ingredientsWithDetails);
    }

    parseOrderData();
  }, [order, ingredients]);



  const ingredientImages = useMemo(() => {
    let images = [];
    let bun: IngredientType | null = null;
    const ingredientsCount = burgerIngredientsWithDetails.length;
    for (let i = 0; i < ingredientsCount; i++) {
      let ingredient = burgerIngredientsWithDetails[i];
      if (ingredient.type === BUN_TYPE) {
        bun = ingredient;
        continue;
      }
      if (i === 5) {
        images.push(<RoundedIngredientImage
          src={ingredient.image}
          name={ingredient.name}
          key={order._id + ingredient._id + i}
          leftOverlap={true}
        >
          {`+${burgerIngredientsWithDetails.length + i}`}
        </RoundedIngredientImage >);
        break;
      }
      images.push(<RoundedIngredientImage
        src={ingredient.image}
        name={ingredient.name}
        key={order._id + ingredient._id + i}
        leftOverlap={true}
      />);
    }
    if (bun) {
      images.unshift(<RoundedIngredientImage
        key={bun._id}
        src={bun.image}
        name={bun.name}
      />);
    }
    return images;
  }, [order, burgerIngredientsWithDetails]);
  return (
    <li
      className={`${styles.card} mb-6 pl-6 pr-6 pt-6 pb-6`}
      onClick={onClick}
    >
      <div className={`${styles.row} mr-6`}>
        <p className="text text_type_digits-default">#{order.number}</p >
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={date}
        />
      </div >
      <div className={`${styles.row} mt-6 mr-6`}>
        <h2 className="text">{order.name}</h2 >
      </div >
      <div
        className={`${styles.row} ${order.status === 'done' ?
          'text_color_success' : null} mt-2`}
      >
        <p className="text text_type_main-small">{translateOrderStatus(
          order.status)}</p >
      </div >
      <div className={`${styles.row} mt-6 mr-6`}>
        <div className={styles.images_row}>
          {ingredientImages}
        </div >
        <p className={`${styles.price} text text_type_digits-default ml-6`}>{burgerPrice}<CurrencyIcon type="primary" />
        </p >
      </div >
    </li >
  );
};