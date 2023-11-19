import React from 'react';
import styles from './rounded-ingredient-image.module.css';

export interface RoundedIngredientImageProps {
  src: string;
  name: string;
  extraClass?: string;
  children?: any;
  leftOverlap?: boolean;
}

export const RoundedIngredientImage: React.FC<RoundedIngredientImageProps> = ({
  src,
  name,
  extraClass,
  children,
  leftOverlap = false,
}) => {
  return (
    <div
      className={`${styles.border} ${leftOverlap ? styles.leftOverlap : null} ${children ? styles.darken : null}`}
    >
      <span className={`text text_type_digits-default ${styles.numberOfAdditionalImages}`}>{children}</span >
      <img
        className={`${styles.image} + ${extraClass}`}
        src={src}
        alt={name}
      />
    </div >
  );
};