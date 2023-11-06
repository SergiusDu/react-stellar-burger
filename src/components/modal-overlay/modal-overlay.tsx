import React, {MouseEvent, ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
    onClose: () => void;
    children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({onClose, children}) => {
    const handleOverlayClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscapeBtn = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscapeBtn);

        return () => {
            window.removeEventListener('keydown', handleEscapeBtn);
        };
    }, [onClose]);

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) throw new Error('No modal-root element found');

    return ReactDOM.createPortal((<section
        className={styles.modal_overlay}
        onClick={handleOverlayClick}
    >
        {children}
    </section >), modalRoot);
};

export default ModalOverlay;
