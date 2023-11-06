import React, {FormEvent} from 'react';
import styles from './form.module.css';

interface FormProps {
    header?: string;
    name?: string;
    action?: string;
    extraClass?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel?: (e: KeyboardEvent) => void;
    children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
                                              header, name, action, extraClass, onSubmit, children, onCancel,
                                          }) => {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (typeof onSubmit === 'function') {
            onSubmit(e);
        }
    }

    function handleKeyDown(e: KeyboardEvent | any) {
        if (e.key === 'Enter') {
            if (typeof onSubmit === 'function') {
                onSubmit(e as unknown as FormEvent<HTMLFormElement>);
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
};