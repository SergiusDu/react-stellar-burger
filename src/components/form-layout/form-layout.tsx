import React from 'react';
import styles from './form-layout.module.css';

interface FormLayoutProps {
    children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({children}) => {
    return (<main className={styles.layout}>
        {children}
    </main >);
};

