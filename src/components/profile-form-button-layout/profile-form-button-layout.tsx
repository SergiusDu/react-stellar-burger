import React, {ReactNode} from 'react';
import styles from './profile-form-button-layout.module.css';
import PropTypes from 'prop-types';

interface ProfileFormButtonLayoutProps {
    children: ReactNode;
}

export const ProfileFormButtonLayout: React.FC<ProfileFormButtonLayoutProps> = ({children}) => {
    return (<div className={styles.buttonsContainer}>
        {children}
    </div >);
};


ProfileFormButtonLayout.propTypes = {
    children: PropTypes.node.isRequired,
};