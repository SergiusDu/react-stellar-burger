import React from "react";
import styles from './form.module.css';

export function Form(props) {
    return (<>
        {props.header ? <h1 className="text text_type_main-medium mb-6">{props.header}</h1> : null}
        <form name={props.header}
              action={props.action}
              className={`${styles.form} + ${props.extraClass}`}
              onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    </>)
}