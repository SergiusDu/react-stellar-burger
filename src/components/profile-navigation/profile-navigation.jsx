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
        <p className="text text_type_main-small text_color_inactive mt-20">
            В этом разделе вы можете <br/>
            изменить свои персональные данные
        </p>

    </nav>)
}
