import styles from './profile-layout.module.css';
import React, {ReactNode} from 'react';

interface ProfileLayoutProps {
    children: ReactNode;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({children}) => {
    return (<main className={`${styles.layout}`}>
        {children}
    </main >);
};
