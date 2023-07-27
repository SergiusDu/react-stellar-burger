import React from "react";
import styles from './styles.css'
import {BurgerIcon, ListIcon, Logo, LogoutIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderLink from "../AppHeaderLink/AppHeaderLink";

export default function AppHeader() {
 return (
     <header>
         <nav className={styles.navigatio}>
            <ul>
                <li className={'ml-5 mr-5 m-4'}>
                    <AppHeaderLink>
                        <BurgerIcon type={"primary"} />
                        <h2>Констукртор</h2>
                    </AppHeaderLink>
                </li>
                <li>
                    <a href="#">
                        <ListIcon type={"primary"} />
                        <h2>Лента заказов</h2>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Logo />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <ProfileIcon type={"secondary"}/>
                        <h2>Личный кабинет</h2>
                    </a>
                </li>
            </ul>
         </nav>
     </header>
 )
}