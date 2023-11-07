import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import styles from '../app/app.module.css';
import {useDispatch} from 'react-redux';
import {setProfilePageAvailable} from '../../services/slices/profile-slice';
import {refreshTokensIfNeeded} from '../../utils/api';
import {fetchIngredients} from '../../services/slices/ingredient-slice';
import AppHeader from '../app-header/app-header';
import {ModalSwitch} from '../modal-switch/modal-switch';
import {AppDispatch} from '../../services/store/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(setProfilePageAvailable());
    refreshTokensIfNeeded(dispatch);
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <Router basename={'/'}>
        <AppHeader />
        <ModalSwitch />
      </Router >
    </div >
  );
};

export default App;
