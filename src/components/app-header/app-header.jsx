import React from "react";
import styles from "./app-header.module.css";
import AppHeaderLink from "./app-header-link/app-header-link";

export default function AppHeader() {
  return (
    <header className={styles.AppHeader}>
      <nav className={styles.navbar}>
        <ul className={styles.header_list}>
          <AppHeaderLink
            icon='burger'
            header={'Конструктор'}
            key={'constructor-link'}
            to={'/'}
          />
          <AppHeaderLink
            icon='list'
            header={'Лента заказов'}
            key={'order-link'}
            to={'/order-list'}
          />
          <AppHeaderLink
            icon='logo'
            key={'logo-link'}
            to={'/'}
          />
          <AppHeaderLink
            icon='profile'
            position="right"
            header={'Личный кабинет'}
            key={'profile-link'}
            to={'/profile'}
          />
        </ul>
      </nav>
    </header>
  );
}