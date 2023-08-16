import React from "react";
import styles from "./draggable-item.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function DraggableItem(props) {
    return (
        <li className={`mb-4 ${styles.draggableItem}`}>
            <DragIcon type={"primary"} />
            {props.children}
        </li>
    )
}

DraggableItem.propTypes = {
  children: PropTypes.node.isRequired
};