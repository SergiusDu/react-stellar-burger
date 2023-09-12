import React from "react";
import styles from "./app-header-link.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function AppHeaderLink({ icon, position, isActive, header }) {
  const ICONS = {
    burger: BurgerIcon, logo: Logo, list: ListIcon, profile: ProfileIcon
  };

  const IconComponent = ICONS[icon];
  const positionStyle = position === 'right' ? styles.link_position_right : '';
  const className = `${positionStyle} p-5 mr-2`;

  return (
    <li className={className}>
      <a href={'#'} className={styles.link} role="button">
        <IconComponent type={isActive ? 'primary' : 'secondary'} />
        {header && <h2 className={`ml-2 text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>{header}</h2>}
      </a>
    </li>
  );
}

AppHeaderLink.propTypes = {
  icon: PropTypes.oneOf(['burger', 'logo', 'list', 'profile']).isRequired,
  position: PropTypes.oneOf(['right']),
  isActive: PropTypes.bool,
  header: PropTypes.string
};
