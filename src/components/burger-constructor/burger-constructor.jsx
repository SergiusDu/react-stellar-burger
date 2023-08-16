import React, {useContext} from "react";
import styles from "./burger-constructor.module.css"
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollableContainer from "../scrollable-container/scrollable-container";
import DraggableItem from "../scrollable-container/draggable-item/draggable-item";
import {OrderDetailsContext} from "../context-providers/order_details_context";
import PropTypes from 'prop-types';


export default function BurgerConstructor({ingredients}) {
  const {setIsOrderDetailsModalOpen} = useContext(OrderDetailsContext);
  return (<section className={`ml-5 mt-25 ${styles.burger_constructor}`}>
    <ConstructorElement
      extraClass={'ml-8 pl-6 pr-8'}
      type="top"
      isLocked={true}
      text="Краторная булка N-200i (верх)"
      price={200}
      thumbnail={`https://code.s3.yandex.net/react/code/meat-04.png`}
    />
    <ScrollableContainer extraClass={'mt-4 mb-4'}>
      <ul className={styles.item_list}>
        {ingredients.filter((ingredient) => ingredient.type !== 'bun')
          .map((filteredIngredient) => (<DraggableItem key={filteredIngredient._id}>
            <ConstructorElement text={filteredIngredient.name}
                                thumbnail={filteredIngredient.image}
                                price={filteredIngredient.price}/>
          </DraggableItem>))}
      </ul>
    </ScrollableContainer>
    <ConstructorElement
      extraClass={'ml-8 pl-6 pr-8'}
      type="bottom"
      isLocked={true}
      text="Краторная булка N-200i (низ)"
      price={200}
      thumbnail={`https://code.s3.yandex.net/react/code/meat-04.png`}
    />

    <div className={`mt-10 ${styles.sum_element}`}>
      <h2 className={`text text_type_digits-medium`}>610</h2>
      <CurrencyIcon type={"primary"}></CurrencyIcon>
      <Button htmlType={"button"}
              type={"primary"}
              size={"large"}
              extraClass={"ml-10"}
              onClick={() => setIsOrderDetailsModalOpen(true)}>Оформить заказ</Button>
    </div>
  </section>)
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};