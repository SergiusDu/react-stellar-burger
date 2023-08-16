import React from "react";
import styles from "./ingredient-details.module.css";
import IngredientData from "./ingredient-data/ingredient-data";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import {useIngredient} from "../context-providers/ingredient-context";

export default function IngredientDetails() {
  const {selectedIngredient, setSelectedIngredient} = useIngredient();

  function togglePopup() {
    setSelectedIngredient(null);
  }

  return (selectedIngredient && <ModalOverlay onClose={togglePopup}>
    <Modal onClose={togglePopup}
           title={`Детали ингредиента`}>
      <figure className={styles.ingredient_details}>
        <picture>
          <source media="(min-width: 1000px)"
                  srcSet={selectedIngredient.image_large}/>
          <source media="(min-width: 600px)"
                  srcSet={selectedIngredient.image_mobile}/>
          <img className={`mb-4 ${styles.ingredient_image}`}
               src={selectedIngredient.image}
               alt={selectedIngredient.name}/>
        </picture>
        <figcaption>
          <h2 className={`text text_type_main-medium ${styles.ingredient_name}`}>{selectedIngredient.name}</h2>
          <dl className={`mt-8 mb-15 ${styles.ingredient_composition}`}>
            <IngredientData name={'Калории,ккал'}
                            description={selectedIngredient.calories}/>
            <IngredientData name={'Белки, г'}
                            description={selectedIngredient.proteins}/>
            <IngredientData name={'Жиры, г'}
                            description={selectedIngredient.fat}/>
            <IngredientData name={'Углеводы, г'}
                            description={selectedIngredient.carbohydrates}/>
          </dl>
        </figcaption>
      </figure>
    </Modal>
  </ModalOverlay>);
}
