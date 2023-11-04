import React from 'react';
import styles from './form-navigation.module.css';

interface FormNavigationProps {
    extraClass?: string;
    children: React.ReactNode;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
                                                                  extraClass, children,
                                                              }) => {
    return (<nav className={extraClass}>
        <ul className={`${styles.navigation} mb-4`}>
            {children}
        </ul >
    </nav >);
};


