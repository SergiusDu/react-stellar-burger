import React from "react";
import styles from "./profile-navigation-link.module.css"
import {Link} from "react-router-dom";
export function ProfileNavigationLink(props) {
    return (
        <li>
            <Link className={`${styles.link} text text_type_main-default text_color_inactive`} to={props.to}>
                {props.linkName}
            </Link>
        </li>
    )
}
