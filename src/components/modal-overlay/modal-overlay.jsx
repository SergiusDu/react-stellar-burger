import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";

export default function ModalOverlay({onClose, children}) {
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    const handleEscapeBtn = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeBtn);

    return () => {
      window.removeEventListener('keydown', handleEscapeBtn);
    }
  }, [onClose]);

  return ReactDOM.createPortal(
    <section className={styles.modal_overlay}
             onClick={handleOverlayClick}>
      {children}
    </section>, document.getElementById('modal-root'))
}



ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

