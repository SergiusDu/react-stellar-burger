import React from "react";
import styles from "./scrollable-container.module.css"
import PropTypes from "prop-types";
export default function ScrollableContainer(props) {

  return(
    <section className={`${props.extraClass} ${styles.scrollable_container}`}>
      {props.children}
    </section>
  )
}

ScrollableContainer.propTypes = {
  children: PropTypes.node,
  extraClass: PropTypes.string,
};