import React from 'react';
import styles from './fieldset.module.css';
function Fieldset(props) {
    return (
        <fieldset className={styles.fieldset} disabled={props.disabled}>
            <legend className={`text text_type_main-medium mb-6 ${styles.legend}`}>
                {props.legend}
            </legend>
            {props.children}
        </fieldset>
    );
}

export default Fieldset;