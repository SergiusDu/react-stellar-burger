import styles from './ingredient.module.css';
import React, {ReactNode} from 'react';

export interface IngredientPageProps {
  children: ReactNode;
}

export const IngredientPage: React.FC<IngredientPageProps> = ({children}) => {
  return (<main className={styles.ingredientLayout}>
    {children}
  </main >);
};
