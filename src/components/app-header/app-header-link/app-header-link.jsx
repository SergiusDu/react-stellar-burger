import React, {useEffect, useState} from 'react';
import styles from './app-header-link.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {NavLink, useLocation} from 'react-router-dom';

export default function AppHeaderLink({icon, position, header, to}) {
    const ICONS = {
        burger: BurgerIcon, logo: Logo, list: ListIcon, profile: ProfileIcon
    };

    const IconComponent = ICONS[icon];
    const positionStyle = position === 'right' ? styles.link_position_right : '';
    const className = `${positionStyle} p-5 mr-2`;
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === to) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [to, location]);
    return (<li className={className}>
            <NavLink to={to}
                  className={styles.link}>
                <IconComponent type={isActive ? 'primary' : 'secondary'}/>
                {header &&
                    <h2 className={`ml-2 text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>{header}</h2>}
            </NavLink>
        </li>);
}

AppHeaderLink.propTypes = {
    icon: PropTypes.oneOf(['burger', 'logo', 'list', 'profile']).isRequired,
    position: PropTypes.oneOf(['right']),
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            pathname: PropTypes.string,
            search: PropTypes.string,
            hash: PropTypes.string,
            state: PropTypes.any
        })
    ]).isRequired,
    header: PropTypes.string
};
