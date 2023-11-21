import React, {ReactElement, useEffect} from 'react';
import styles from './not-found.module.css';
import {Link} from 'react-router-dom';
import {MAIN_PAGE_PATH} from '../../utils/constants';

export default function NotFound(): ReactElement {


  useEffect(() => {
    console.log('NOT FOUND')
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text text_color_primary text_type_main-large">Ошибка 404</h1>
      <Link className="text text_color_inactive text_type_main-large" to={MAIN_PAGE_PATH}>Вернуться на главную</Link>
    </div>
  );
}