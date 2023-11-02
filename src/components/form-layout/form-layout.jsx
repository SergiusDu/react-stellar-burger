import React from 'react';
import styles from './form-layout.module.css';
import PropTypes from 'prop-types';

export function FormLayout({children}) {
    return (<main className={styles.layout}>
            {children}
        </main >);
}

FormLayout.propTypes = {
    children: PropTypes.node.isRequired,
};