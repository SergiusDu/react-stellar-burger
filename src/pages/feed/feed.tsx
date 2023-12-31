import {ProfileLayout} from '../../components/profile-layout/profile-layout';
import React, {useMemo} from 'react';
import {
  FeedWebsocketActions,
  selectAllOrders,
  selectAllTotalOrders,
  selectAllTotalTodayOrders, selectWebSocketStatus,
} from '../../services/slices/feed-slice';
import styles from './feed.module.css';
import {useHistory, useLocation} from 'react-router-dom';
import {Order} from '../../utils/types';
import {FEED_PAGE_PATH} from '../../utils/constants';
import {OrderList} from '../../components/order-list/order-list';
import {useAppSelector} from '../../utils/hooks/reduxHooks';
import useWebSocket from '../../utils/hooks/useWebSocket';

export const Feed: React.FC = () => {
  const isFeedWebSocketWorking = useAppSelector(selectWebSocketStatus);
  useWebSocket(FeedWebsocketActions, isFeedWebSocketWorking);
  const orders = useAppSelector(selectAllOrders);
  const totalOrders = useAppSelector(selectAllTotalTodayOrders);
  const totalTodayOrders = useAppSelector(selectAllTotalOrders);
  const history = useHistory();
  const location = useLocation();

  function navigateOrderClick(order: Order) {
    history.push({
      pathname: FEED_PAGE_PATH + '/' + order._id,
      state: {background: location},
    });
  }

  const readyOrdersNumbers = useMemo(() => {
    let readyOrders: JSX.Element[] = [];
    orders.forEach(order => {
      if (order.status === 'done') {
        readyOrders.push(<li
          onClick={() => navigateOrderClick(order)}
          className={`text text_type_digits-default text_color_success ${styles.list_item}`}
          key={order._id}
        >{order.number}</li >);
      }
    });
    return readyOrders;
  }, [orders]);
  const ordersInProgressNumbers = useMemo(() => {
    let readyOrders: JSX.Element[] = [];
    orders.forEach(order => {
      if (order.status !== 'done') {
        readyOrders.push(<li
          onClick={() => navigateOrderClick(order)}
          className={`text text_type_digits-default ${styles.list_item}`}
          key={order._id}
        >{order.number}</li >);
      }
    });
    return readyOrders;
  }, [navigateOrderClick, orders]);
  return (
    orders.length ? <ProfileLayout >
      <OrderList
        orders={orders}
        navigateOnOrderClick={navigateOrderClick}
      />
      <div className="ml-15">
        <div className={`${styles.row} mb-15`}>
          <div >
            <h2 className={`text text_type_main-medium mb-6`}>Готовы: </h2 >
            <ul className={`${styles.orders_list} ${styles.scrollable_container}`}>
              {readyOrdersNumbers}
            </ul >
          </div >
          <div >
            <h2 className={`text text_type_main-medium mb-6`}>
              В работе:
            </h2 >
            <ul className={`${styles.orders_list} ${styles.scrollable_container}`}>
              {ordersInProgressNumbers}
            </ul >
          </div >
        </div >
        <h2 className={`text text_type_main-medium`}>Выполнено за
                                                     сегодня:</h2 >
        <p className={`text text_type_digits-large ${styles.text_shadow}`}>{totalOrders}</p >
        <h2 className={`text text_type_main-medium mt-15`}>Выполнено за все
                                                           время:</h2 >
        <p className={`text text_type_digits-large ${styles.text_shadow}`}>{totalTodayOrders}</p >
      </div >
    </ProfileLayout > : null
  );
};
