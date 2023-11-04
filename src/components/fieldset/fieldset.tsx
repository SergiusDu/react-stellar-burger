import React, {ReactNode} from 'react';
import styles from './fieldset.module.css';

interface FieldsetProps {
    disabled?: boolean;
    name?: string;
    legend?: string;
    children: ReactNode;
}

const Fieldset: React.FC<FieldsetProps> = ({disabled, name, legend, children}) => {
    return (<fieldset
            className={styles.fieldset}
            disabled={disabled}
            name={name}
        >
            <legend className={`text text_type_main-medium mb-6 ${styles.legend}`}>
                {legend}
            </legend >
            {children}
        </fieldset >);
};

export default Fieldset;