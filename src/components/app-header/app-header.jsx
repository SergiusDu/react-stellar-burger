import React from "react";
import styles from "./app-header.module.css";
import AppHeaderLink from "./app-header-link/app-header-link";

export default function AppHeader() {
  return (
    <header className={styles.AppHeader}>
      <nav className={styles.navbar}>
        <ul className={styles.header_list}>
          <AppHeaderLink
            isActive={true}
            icon='burger'
            header={'Конструктор'}
            key={'constructor-link'}
          />
          <AppHeaderLink
            icon='list'
            header={'Лента заказов'}
            key={'order-link'}
          />
          <AppHeaderLink
            icon='logo'
            key={'logo-link'}
          />
          <AppHeaderLink
            icon='profile'
            position="right"
            header={'Личный кабинет'}
            key={'profile-link'}
          />
        </ul>
      </nav>
    </header>
  );
}