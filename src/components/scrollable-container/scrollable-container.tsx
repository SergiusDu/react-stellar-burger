import React, {ReactNode} from 'react';
import styles from './scrollable-container.module.css';

interface ScrollableContainerProps {
    children?: ReactNode;
    extraClass?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({extraClass, children}) => {

    return (<section className={`${extraClass} ${styles.scrollable_container}`}>
        {children}
    </section >);
};


export default ScrollableContainer;