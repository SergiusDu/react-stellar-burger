import React from 'react';
import styles from './fieldset.module.css';
import PropTypes from 'prop-types';
function Fieldset({disabled, name, legend, children}) {
    return (
        <fieldset className={styles.fieldset} disabled={disabled} name={name}>
            <legend className={`text text_type_main-medium mb-6 ${styles.legend}`}>
                {legend}
            </legend>
            {children}
        </fieldset>
    );
}

Fieldset.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    legend: PropTypes.string,
    children: PropTypes.node.isRequired
};
export default Fieldset;