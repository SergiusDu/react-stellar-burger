import React, {MouseEventHandler, useEffect, useState} from 'react';
import styles from './profile-navigation-link.module.css';
import {NavLink, useLocation} from 'react-router-dom';

interface ProfileNavigationLinkProps {
    onClick?: MouseEventHandler; // тип для обработчика событий клика
    to: string;
    linkName: string;
}

export const ProfileNavigationLink: React.FC<ProfileNavigationLinkProps> = ({onClick, to, linkName}) => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.endsWith(to)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [to, location]);
    return (<li >
        <NavLink
            onClick={onClick}
            className={`${styles.link} text text_type_main-large ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
            to={to}
        >
            {linkName}
        </NavLink >
    </li >);
};