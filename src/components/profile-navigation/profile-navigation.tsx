import React from 'react';
import styles from './profile-navigation.module.css';
import {
    ProfileNavigationLink,
} from '../profile-navigation-link/profile-navigation-link';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../services/slices/profile-slice';
import {
    MAIN_PAGE_PATH,
    ORDER_LIST_PAGE_PATH,
    PROFILE_PAGE_PATH,
} from '../../utils/constants';
import {AppDispatch} from '../../services/store/store';

export const ProfileNavigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  function logoutHandler() {
    dispatch(logoutUser());
  }

  return (
    <nav >
      <ul className={`${styles.navigationList}`}>
        <ProfileNavigationLink
          to={PROFILE_PAGE_PATH}
          linkName="Профиль"
        />
        <ProfileNavigationLink
          to={ORDER_LIST_PAGE_PATH}
          linkName="История заказов"
        />
        <ProfileNavigationLink
          onClick={logoutHandler}
          to={MAIN_PAGE_PATH}
          linkName="Выход"
        />
      </ul >
      <p className="text text_type_main-small text_color_inactive mt-20">
        В этом разделе вы можете <br />
        изменить свои персональные данные
      </p >

    </nav >
  );
};
