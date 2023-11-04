import React, {useEffect, useState} from 'react';
import styles from './app-header-link.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useLocation} from 'react-router-dom';

type AppHeaderLinkProps = {
    icon: 'burger' | 'logo' | 'list' | 'profile'; position?: 'right'; header?: string; to: string | {
        pathname: string; search?: string; hash?: string; state?: any;
    };
};
const AppHeaderLink: React.FC<AppHeaderLinkProps> = ({
                                                         icon, position, header, to,
                                                     }) => {
    const ICONS = {
        burger: BurgerIcon, logo: Logo, list: ListIcon, profile: ProfileIcon,
    };

    const IconComponent = ICONS[icon];
    const positionStyle = position === 'right' ? styles.link_position_right : '';
    const className = `${positionStyle} p-5 mr-2`;
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === to) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [to, location]);
    return (<li className={className}>
        <NavLink
            to={to}
            className={styles.link}
        >
            <IconComponent type={isActive ? 'primary' : 'secondary'} />
            {header && <h2
                className={`ml-2 text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
            >{header}</h2 >}
        </NavLink >
    </li >);
};

export default AppHeaderLink;