import React from 'react';
import styles from './form-navigation.module.css';
import PropTypes from 'prop-types';

export function FormNavigation({
                                   extraClass,
                                   children,
                               }) {
    return (<nav className={extraClass}>
        <ul className={`${styles.navigation} mb-4`}>
            {children}
        </ul >
    </nav >);
}

FormNavigation.propTypes = {
    extraClass: PropTypes.string,
    children: PropTypes.node.isRequired,
};
