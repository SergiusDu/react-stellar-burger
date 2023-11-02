import React from "react";
import {Link} from "react-router-dom";
import styles from "./form-navigation-link.module.css"
import PropTypes from 'prop-types';

export function FormNavigationLink({text, link, linkName}) {
    return (<li className="text text_color_inactive text_type_main-default">
        {text} <Link className={`text text_color_accent text_type_main-default ${styles.navlink}`}
                           to={link}>{linkName}</Link>
    </li>)
}

FormNavigationLink.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired
};