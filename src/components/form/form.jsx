import React from 'react';
import styles from './form.module.css';
import PropTypes from 'prop-types';

export function Form({
                         header,
                         name,
                         action,
                         extraClass,
                         onSubmit,
                         children,
                         onCancel,
                     }) {
    function handleSubmit(e) {
        e.preventDefault();
        if (typeof onSubmit === 'function') {
            onSubmit(e);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (typeof onSubmit === 'function') {
                onSubmit(e);
            }
        } else if (e.key === 'Escape') {
            if (typeof onCancel === 'function') {
                onCancel(e);
            }
        }
    }

    return (<>
        {header ? <h1 className="text text_type_main-medium mb-6">{header}</h1 > : null}
        <form
            name={name || header}
            action={action}
            className={`${styles.form} + ${extraClass}`}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
        >
            {children}
        </form >
    </>);
}

Form.propTypes = {
    header: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.string,
    extraClass: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    children: PropTypes.node.isRequired,
};