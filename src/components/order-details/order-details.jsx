import React, { useContext } from "react";
import styles from "./order-details.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import doneImage from "../../images/done.svg";
import { OrderDetailsContext } from "../context-providers/order_details_context";

export default function OrderDetails() {
    const { isOrderDetailsModalOpen, setIsOrderDetailsModalOpen } = useContext(OrderDetailsContext);

    const orderNumber = "034536";

    if (!isOrderDetailsModalOpen) return null;

    return (
      <ModalOverlay onClose={() => setIsOrderDetailsModalOpen(false)}>
          <Modal onClose={() => setIsOrderDetailsModalOpen(false)}>
              <header className={`mt-30 ${styles.order_header}`}>
                  <h2 className={`text text_type_digits-large ${styles.order_number}`}>{orderNumber}</h2>
                  <p className={`mt-8 text text_type_main-default`}>идентификатор заказа</p>
              </header>
              <figure className={styles.order_figure}>
                  <img className={`mt-15`} src={doneImage} alt={`Заказ успешен`} />
                  <figcaption>
                      <p className={`text text_type_main-small mt-15`}>Ваш заказ начали готовить</p>
                  </figcaption>
              </figure>
              <footer>
                  <p className={`mt-2 mb-30 text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
              </footer>
          </Modal>
      </ModalOverlay>
    );
}
