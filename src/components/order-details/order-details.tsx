import React from 'react';
import styles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import {selectOrderNumber} from '../../services/slices/order-details-slice';
import {useSelector} from 'react-redux';

export const OrderDetails: React.FC = () => {
    const orderNumber = useSelector(selectOrderNumber);
    return (<>
        <header className={`mt-30 ${styles.order_header}`}>
            <h2 className={`text text_type_digits-large ${styles.order_number}`}>{orderNumber}</h2 >
            <p className={`mt-8 text text_type_main-default`}>идентификатор заказа</p >
        </header >
        <figure className={styles.order_figure}>
            <img
                className={`mt-15`}
                src={doneImage}
                alt={`Заказ успешен`}
            />
            <figcaption >
                <p className={`text text_type_main-small mt-15`}>Ваш заказ начали готовить</p >
            </figcaption >
        </figure >
        <footer >
            <p className={`mt-2 mb-30 text text_type_main-small text_color_inactive`}>Дождитесь готовности на
                                                                                      орбитальной станции</p >
        </footer >
    </>);
};

export default OrderDetails;
