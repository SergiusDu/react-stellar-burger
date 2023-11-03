import React, {useEffect, useState} from 'react';
import styles from './profile-navigation-link.module.css';
import {NavLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProfileNavigationLink({onClick, to, linkName}) {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.endsWith(to)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [to, location]);
    return (
        <li>
            <NavLink onClick={onClick ? () => onClick() : null} className={`${styles.link} text text_type_main-large ${isActive? 'text_color_primary' : 'text_color_inactive'}`} to={to}>
                {linkName}
            </NavLink>
        </li>
    )
}

ProfileNavigationLink.propTypes = {
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired
};