import React from "react";
import styles from "./form-navigation.module.css"

export function FormNavigation(props) {
    return (<nav className={props.extraClass}>
            <ul className={`${styles.navigation} mb-4`}>
                {props.children}
            </ul>
        </nav>)
}
