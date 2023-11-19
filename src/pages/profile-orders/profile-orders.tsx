import React from 'react';
import {ProfileLayout} from '../../components/profile-layout/profile-layout';
import {
  ProfileNavigation,
} from '../../components/profile-navigation/profile-navigation';
import {OrderList} from '../../components/order-list/order-list';
import {selectProfileOrders} from '../../services/slices/feed-slice';
import {Order} from '../../utils/types';
import {PROFILE_ORDERS_PATH} from '../../utils/constants';
import {useHistory, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../utils/hooks/reduxHooks';
import {
  selectProfileOrdersWebSocketStatus,
} from '../../services/slices/profile-slice';
import {createWebSocketProfileOrdersAction} from '../../utils/api';
import useWebSocket from '../../utils/hooks/useWebSocket';

export const ProfileOrders: React.FC = () => {
  const orders = useAppSelector(selectProfileOrders);
  const history = useHistory();
  const location = useLocation();
  const websocketStatus = useAppSelector(selectProfileOrdersWebSocketStatus);
  useWebSocket(createWebSocketProfileOrdersAction(), websocketStatus);

  function navigateOrderClick(order: Order) {
    history.push({
      pathname: PROFILE_ORDERS_PATH + '/'
        + order._id, state: {background: location},
    });
  }

  return (
    <ProfileLayout >
      <ProfileNavigation />
      <OrderList
        orders={orders}
        navigateOnOrderClick={navigateOrderClick}
      />
    </ProfileLayout >
  );
};