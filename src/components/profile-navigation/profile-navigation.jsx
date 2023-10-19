import React from "react";
import {Link} from "react-router-dom";
import styles from "./profile-navigation.module.css"
import {ProfileNavigationLink} from "../profile-navigation-link/profile-navigation-link";
export function ProfileNavigation() {
    return (<nav>
        <ul className={`${styles.navigationList}`}>
            <ProfileNavigationLink to={'/profile'} linkName="Профиль" />
            <ProfileNavigationLink to={'/profile/orders'} linkName="История заказов" />
            <ProfileNavigationLink to={'/'} linkName="Выход" />
        </ul>
        <p>
            В этом разделе вы можете
        </p>
        <p>
            изменить свои персональные данные
        </p>
    </nav>)
}
