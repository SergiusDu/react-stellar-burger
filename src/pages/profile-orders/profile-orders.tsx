import React from 'react';
import {ProfileLayout} from '../../components/profile-layout/profile-layout';
import {
  ProfileNavigation
} from '../../components/profile-navigation/profile-navigation';
import {OrderList} from '../../components/order-list/order-list';
import {useSelector} from 'react-redux';
import {selectProfileOrders} from '../../services/slices/feed-slice';
import {Order} from '../../utils/types';
import {
  FEED_PAGE_PATH,
  PROFILE_ORDER_ID_PATH,
  PROFILE_ORDERS_PATH,
} from '../../utils/constants';
import {useHistory, useLocation} from 'react-router-dom';

export const ProfileOrders: React.FC = () => {
  const orders = useSelector(selectProfileOrders);
  const history = useHistory();
  const location = useLocation();
  function navigateOrderClick(order: Order) {
    history.push({
      pathname: PROFILE_ORDERS_PATH + '/' + order._id,
      state: {background: location},
    });
  }
  return (
    <ProfileLayout>
      <ProfileNavigation />
      <OrderList orders={orders} navigateOnOrderClick={navigateOrderClick} />
    </ProfileLayout>
  )
}