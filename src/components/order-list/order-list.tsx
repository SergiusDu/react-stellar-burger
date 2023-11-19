import React, {useMemo} from 'react';
import {FeedCard} from '../feed-card/feed-card';
import styles from './order-list.module.css';
import {Order} from '../../utils/types';

interface OrderListProps {
  orders: Order[];
  navigateOnOrderClick: Function;
}
export const OrderList: React.FC<OrderListProps> = ({orders, navigateOnOrderClick}) => {
  const ordersCards = useMemo(() => {
    return orders.map(order => <FeedCard
      onClick={() => navigateOnOrderClick(order)}
      order={order}
      key={order._id}
    />);
  }, [orders, navigateOnOrderClick]);
  return (
    <ul className={`${styles.scrollable_container}`}>
      {ordersCards}
    </ul >
  )
}