import React, {ReactNode} from 'react';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
                                       title,
                                       onClose,
                                       children,
                                     }) => {
  return (<ModalOverlay onClose={onClose}>
    <section className={styles.inner_zone}>
      {title ? (<div className={`pl-10 mt-10 pr-10 ${styles.button_and_header}`}>
        <h2 className={`text text_type_main-large text_color_primary ${styles.modal_header}`}>{title}</h2 >
        <button
          className={styles.close_button}
          onClick={onClose}
        >
          <CloseIcon type={'primary'} />
        </button >
      </div >) : (<button
        className={`${styles.close_button} mt-15 mr-10 ${styles.close_button_position_right}`}
        onClick={onClose}
      >
        <CloseIcon type={'primary'} />
      </button >)}
      {children}
    </section >
  </ModalOverlay >);
};

export default Modal;
