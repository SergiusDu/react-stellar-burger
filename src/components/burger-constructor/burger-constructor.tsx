import React, {useMemo} from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollableContainer from '../scrollable-container/scrollable-container';
import DraggableItem from '../scrollable-container/draggable-item/draggable-item';
import {useDispatch, useSelector} from 'react-redux';
import {
    addIngredient,
    moveItem,
    removeIngredient,
    resetIngredients,
    selectBun,
    selectIngredients,
    setBun,
} from '../../services/slices/burger-constructor-slice';
import {
    decreaseIngredientAmount,
    increaseIngredientAmount,
    resetAllIngredientAmount,
    setBunCount,
} from '../../services/slices/ingredient-slice';
import {useDrop} from 'react-dnd';
import {fetchOrder, selectIsLoading} from '../../services/slices/order-details-slice';
import {BUN_TYPE, IngredientType, MAIN_TYPE, SAUCE_TYPE} from '../../utils/types';
import {profilePageAvailability, setProfilePageAvailable} from '../../services/slices/profile-slice';
import {useHistory} from 'react-router-dom';
import {LOGIN_PAGE_PATH} from '../../utils/constants';

const BurgerConstructor: React.FC = () => {
    const bun = useSelector(selectBun);
    const dispatch = useDispatch();
    const ingredients = useSelector(selectIngredients);
    const isAuthorized = useSelector(profilePageAvailability);
    const isFetchLoading = useSelector(selectIsLoading);
    const history = useHistory();
    const memorizedSum = useMemo(() => {
      const bunPrice = bun ? bun.price * 2 : 0;
        if (!bun && ingredients.length === 0) return 0;
        if (ingredients.length === 0) return bunPrice;
        return ingredients.reduce((accumulator: number, ingredient: IngredientType) => accumulator + ingredient.price, bunPrice);
    }, [ingredients, bun]);

    const [, ref] = useDrop({
        accept: ['ingredient', 'bun'], drop: (item: IngredientType) => {
            if (!bun && item.type !== BUN_TYPE) {
                console.warn('Перетаскивание запрещено: булка отсутствует');
                return;
            }
            if (!item.type) {
                console.error(`Ошибка в перемещении ингредиента: недействительный тип ${item}`);
                return;
            }
            switch (item.type) {
                case MAIN_TYPE:
                case SAUCE_TYPE:
                    dispatch(addIngredient({
                        ...item, dataIndex: ingredients.length,
                    }));
                    dispatch(increaseIngredientAmount(item._id));
                    break;
                case BUN_TYPE:
                    dispatch(setBun(item));
                    dispatch(setBunCount(item._id));
                    break;
                default:
                    console.log(`Необработанный тип ингредиента: ${item.type}`);
            }
        },
    });

    async function handleOrderClick() {
        if (isFetchLoading) {
            return;
        }
        dispatch(setProfilePageAvailable());
        if (!isAuthorized) {
            history.push(LOGIN_PAGE_PATH);
            return;
        }
        try {
          // TODO Check if I can do it better
          if(bun) {
            const itemsToOrder = [...ingredients.map((item: IngredientType) => item._id), bun._id, bun._id];
            await dispatch(fetchOrder(itemsToOrder));
            dispatch(resetIngredients());
            dispatch(resetAllIngredientAmount());
            dispatch(setBun(null));
          }
        } catch (error) {
            console.error('Не удалось оформить заказ: ', error);
        }
    }

    const handleDeleteIngredient = (ingredient: IngredientType) => {
        dispatch(removeIngredient(ingredient.uniqueId));
        dispatch(decreaseIngredientAmount(ingredient._id));
    };

    const moveItemInRedux = (fromIndex: number, toIndex: number) => {
        dispatch(moveItem({
            fromIndex, toIndex,
        }));
    };

    return (<section
        ref={ref}
        className={`ml-5 mt-25 ${styles.burger_constructor}`}
    >
        {bun ? <>
            <ConstructorElement
                extraClass={'ml-8 pl-6 pr-8'}
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
            />
            <ScrollableContainer extraClass={'mt-4'}>
                <ul className={styles.item_list}>
                    {ingredients.map((ingredient: IngredientType, index: number) => (<DraggableItem
                        key={ingredient.uniqueId}
                        index={index}
                        moveItem={moveItemInRedux}
                    >
                        <ConstructorElement
                            text={ingredient.name}
                            thumbnail={ingredient.image}
                            price={ingredient.price}
                            handleClose={() => handleDeleteIngredient(ingredient)
                            }
                        />
                    </DraggableItem >))}
                </ul >
            </ScrollableContainer >
            <ConstructorElement
                extraClass={`ml-8 pl-6 pr-8 ${styles.bottom_bun}`}
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
            />
        </> : <div className={styles.add_bun_container}>
            <p className="text text_color_inactive text_type_main-default">Пожалуйста, перенесите сюда булку
                                                                           и ингредиенты для создания
                                                                           заказа</p >
        </div >}

        <div className={`mt-10 ${styles.sum_element}`}>
            {!isNaN(memorizedSum) && (<>
                <h2 className={`text text_type_digits-medium`}>{memorizedSum}</h2 >
                <CurrencyIcon type={'primary'} />
            </>)}
            <Button
                htmlType={'button'}
                type={'primary'}
                size={'large'}
                extraClass={'ml-10'}
                onClick={handleOrderClick}
                disabled={!bun || isFetchLoading}
            >
                Оформить заказ
            </Button >
        </div >
    </section >);
};

export default BurgerConstructor;