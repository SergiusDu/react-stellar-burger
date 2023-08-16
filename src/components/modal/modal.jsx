import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({ title, onClose, children }) {
  return (
    <div className={styles.inner_zone}>
      {title ? (
        <div className={`pl-10 mt-10 pr-10 ${styles.button_and_header}`}>
          <h2 className={`text text_type_main-large text_color_primary ${styles.modal_header}`}>{title}</h2>
          <button className={styles.close_button} onClick={onClose}>
            <CloseIcon type={"primary"} />
          </button>
        </div>
      ) : (
        <button className={`${styles.close_button} mt-15 mr-10 ${styles.close_button_position_right}`} onClick={onClose}>
          <CloseIcon type={"primary"} />
        </button>
      )}
      {children}
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
