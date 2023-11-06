import React, {useRef} from 'react';
import styles from './draggable-item.module.css';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useDrag, useDrop} from 'react-dnd';


interface DraggableItemProps {
    children: React.ReactNode;
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    type: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({children, index, moveItem}) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'ITEM', hover: (draggedItem: DragItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const [, drag] = useDrag({
        type: 'ITEM', item: {index},
    });

    drag(drop(ref));
    return (<li
        ref={ref}
        className={`mb-4 ${styles.draggableItem}`}
    >
        <DragIcon type={'primary'} />
        {children}
    </li >);
};

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired, index: PropTypes.number.isRequired, moveItem: PropTypes.func.isRequired,
};

export default DraggableItem;