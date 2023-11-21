import React from 'react';
import styles from './profile-navigation.module.css';
import {
  ProfileNavigationLink,
} from '../profile-navigation-link/profile-navigation-link';
import {logoutUser} from '../../services/slices/profile-slice';
import {
  ACCESS_TOKEN_NAME,
  MAIN_PAGE_PATH,
  PROFILE_ORDERS_PATH,
  PROFILE_PAGE_PATH, REFRESH_TOKEN_NAME,
} from '../../utils/constants';
import {useAppDispatch} from '../../utils/hooks/reduxHooks';
import {clearCookies} from '../../utils/api';

export const ProfileNavigation: React.FC = () => {
  const dispatch = useAppDispatch();

  async function logoutHandler() {
    localStorage.clear();
    await dispatch(logoutUser());
    clearCookies([ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME]);
  }

  return (
    <nav >
      <ul className={`${styles.navigationList}`}>
        <ProfileNavigationLink
          to={PROFILE_PAGE_PATH}
          linkName="Профиль"
        />
        <ProfileNavigationLink
          to={PROFILE_ORDERS_PATH}
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
