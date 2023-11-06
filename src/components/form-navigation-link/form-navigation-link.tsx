import React from 'react';
import {Link} from 'react-router-dom';
import styles from './form-navigation-link.module.css';

interface FormNavigationLinkProps {
    text: string;
    link: string;
    linkName: string;
}

export const FormNavigationLink: React.FC<FormNavigationLinkProps> = ({
                                                                          text, link, linkName,
                                                                      }) => {
    return (<li className="text text_color_inactive text_type_main-default">
        {text} <Link
        className={`text text_color_accent text_type_main-default ${styles.navlink}`}
        to={link}
    >{linkName}</Link >
    </li >);
};

