import React from 'react';
import styles from './app-header.module.css';
import AppHeaderLink from './app-header-link/app-header-link';
import {useSelector} from 'react-redux';
import {profilePageAvailability} from '../../services/slices/profile-slice';
import {
  FEED_PAGE_PATH,
  LOGIN_PAGE_PATH,
  MAIN_PAGE_PATH,
  ORDER_LIST_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from '../../utils/constants';

const AppHeader: React.FC = () => {
  const profileAvailability: boolean = useSelector(profilePageAvailability);
  return (
    <header className={styles.AppHeader}>
      <nav className={styles.navbar}>
        <ul className={styles.header_list}>
          <AppHeaderLink
            icon="burger"
            header={'Конструктор'}
            key={'constructor-link'}
            to={MAIN_PAGE_PATH}
          />
          <AppHeaderLink
            icon="list"
            header={'Лента заказов'}
            key={'order-link'}
            to={FEED_PAGE_PATH}
          />
          <AppHeaderLink
            icon="logo"
            key={'logo-link'}
            to={MAIN_PAGE_PATH}
          />
          {profileAvailability ? <AppHeaderLink
            icon="profile"
            position="right"
            header={'Личный кабинет'}
            key={'profile-link'}
            to={PROFILE_PAGE_PATH}
          /> : <AppHeaderLink
            icon="profile"
            position="right"
            header={'Войти'}
            key={'profile-link'}
            to={{
              pathname: LOGIN_PAGE_PATH,
              search: `redirectTo=${PROFILE_PAGE_PATH}`,
            }}
          />}
        </ul >
      </nav >
    </header >
  );
}
export default AppHeader;