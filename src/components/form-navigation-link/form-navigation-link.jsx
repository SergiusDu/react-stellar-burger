import React from "react";
import {Link} from "react-router-dom";
import styles from "./form-navigation-link.module.css"

export function FormNavigationLink(props) {
    return (<li className="text text_color_inactive text_type_main-default">
        {props.text} <Link className={`text text_color_accent text_type_main-default ${styles.navlink}`}
                           to={props.link}>{props.linkName}</Link>
    </li>)
}
