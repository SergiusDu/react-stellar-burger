import React from 'react';
import styles from "./profile-form-button-layout.module.css";

export function ProfileFormButtonLayout({children}) {
    return(
        <div className={styles.buttonsContainer}>
            {children}
        </div>
    )
}