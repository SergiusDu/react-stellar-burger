import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from './ingredient-list/ingredient-list';
import styles from './burger-ingredients.module.css';
import {BUN_TYPE, MAIN_TYPE, SAUCE_TYPE} from '../../utils/types';

const BurgerIngredients: React.FC = () => {
  const [current, setCurrent] = useState<string>(BUN_TYPE);
  const containerRef = useRef<HTMLElement | null>(null);
  const bunCategoryRef = useRef<HTMLElement | null>(null);
  const sauceCategoryRef = useRef<HTMLElement | null>(null);
  const mainCategoryRef = useRef<HTMLElement | null>(null);
  const categoryRefs = useMemo(() => ({
    bun: bunCategoryRef,
    sauce: sauceCategoryRef,
    main: mainCategoryRef,
  }), [bunCategoryRef, sauceCategoryRef, mainCategoryRef]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrent(entry.target.id);
        }
      });
    }, {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: [0.4],
    });
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
    const element = containerRef.current?.querySelector(`#${value}`);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }, []);

  return (<section className={`mr-5 ${styles.burger_ingredients}`}>
    <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2 >
    <div className={styles.flex_container}>
      <Tab
        active={current === BUN_TYPE}
        value={BUN_TYPE}
        onClick={handleTabClick}
      >Булки</Tab >
      <Tab
        active={current === SAUCE_TYPE}
        value={SAUCE_TYPE}
        onClick={handleTabClick}
      >Соусы</Tab >
      <Tab
        active={current === MAIN_TYPE}
        value={MAIN_TYPE}
        onClick={handleTabClick}
      >Начинки</Tab >
    </div >
    <IngredientList
      ref={containerRef}
      refs={categoryRefs}
    />
  </section >);
};

export default BurgerIngredients;