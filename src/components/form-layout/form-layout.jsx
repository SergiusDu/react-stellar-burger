import React from "react";
import styles from "./form-layout.module.css"

export function FormLayout(props) {
    return (
        <main className={styles.layout}>
            {props.children}
        </main>
    )
}
