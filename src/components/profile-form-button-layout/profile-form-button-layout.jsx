import React from 'react';
import styles from './profile-form-button-layout.module.css';
import PropTypes from 'prop-types';

export function ProfileFormButtonLayout({children}) {
    return (<div className={styles.buttonsContainer}>
            {children}
        </div >);
}


ProfileFormButtonLayout.propTypes = {
    children: PropTypes.node.isRequired,
};