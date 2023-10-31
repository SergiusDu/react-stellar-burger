import React, {useEffect, useState} from "react";
import styles from "./profile-navigation-link.module.css"
import {Link, useLocation} from "react-router-dom";
export function ProfileNavigationLink(props) {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.endsWith(props.to)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [props.to, location]);
    return (
        <li>
            <Link onClick={props.onClick ? () => props.onClick() : null} className={`${styles.link} text text_type_main-large ${isActive? 'text_color_primary' : 'text_color_inactive'}`} to={props.to}>
                {props.linkName}
            </Link>
        </li>
    )
}
