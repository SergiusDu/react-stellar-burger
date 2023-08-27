import React, {useCallback, useEffect, useMemo} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
import styles from "./burger-ingredients.module.css";
import PropTypes from 'prop-types';
import {ingredientShape} from "../../utils/types";

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('bun');
    const containerRef = React.useRef(null);
    const bunCategoryRef = React.useRef(null);
    const sauceCategoryRef = React.useRef(null);
    const mainCategoryRef = React.useRef(null);
    const categoryRefs = useMemo(() => ({
        bun: bunCategoryRef,
        sauce: sauceCategoryRef,
        main: mainCategoryRef,
    }), [bunCategoryRef, sauceCategoryRef, mainCategoryRef]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrent(entry.target.id);
                    }
                });
            },
            { root: containerRef.current, rootMargin: "0px", threshold: [0.2] }
        );

        Object.values(categoryRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(categoryRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [categoryRefs]);

    const handleTabClick = useCallback((value) => {
        setCurrent(value);
        const element = containerRef.current.querySelector(`#${value}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <>
            <section className={`mr-5 ${styles.burger_ingredients}`}>
                <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
                <div className={styles.flex_container}>
                    <Tab active={current === 'bun'} value={'bun'} onClick={handleTabClick}>Булки</Tab>
                    <Tab active={current === 'sauce'} value={'sauce'} onClick={handleTabClick}>Соусы</Tab>
                    <Tab active={current === 'main'} value={'main'} onClick={handleTabClick}>Начинки</Tab>
                </div>
                <IngredientList ingredients={props.ingredients}
                                ref={containerRef}
                                refs={categoryRefs} />
            </section>
        </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
};
