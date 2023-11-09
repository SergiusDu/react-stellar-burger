import React from 'react';
import styles from './feed-card.module.css';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const FeedCard: React.FC = () => {
  const date = new Date();
  return(
    <li className={styles.card}>
      <p>#034535</p>
      <FormattedDate date={date} />
      <h2>Death Star Starship Main бургер</h2>
      <p>430 <CurrencyIcon type="primary" /></p>
    </li>
  )
};