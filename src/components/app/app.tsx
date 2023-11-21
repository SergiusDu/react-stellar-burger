import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import styles from '../app/app.module.css';
import {
  profilePageAvailability,
  setProfilePageAvailable,
} from '../../services/slices/profile-slice';
import {
  getAccessTokenFromCookies,
  refreshTokensIfNeeded,
} from '../../utils/api';
import {fetchIngredients} from '../../services/slices/ingredient-slice';
import AppHeader from '../app-header/app-header';
import {ModalSwitch} from '../modal-switch/modal-switch';
import {
  CONNECT_PROFILE_WEBSOCKET,
  DISCONNECT_FEED_WEBSOCKET,
  DISCONNECT_PROFILE_WEBSOCKET,
} from '../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/reduxHooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isProfileAvailable = useAppSelector(profilePageAvailability);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(setProfilePageAvailable());
    refreshTokensIfNeeded(dispatch);

    const clearAccessToken = getAccessTokenFromCookies()?.split(' ')[1];

    if (isProfileAvailable && typeof clearAccessToken === 'string') {
      console.log('ЗАПУСКАЮ ВЕБСОКЕТ');
      dispatch({
        type: CONNECT_PROFILE_WEBSOCKET,
        payload: clearAccessToken,
      });
    }
    else {
      dispatch({type: DISCONNECT_PROFILE_WEBSOCKET});
    }
    return () => {
      dispatch({type: DISCONNECT_PROFILE_WEBSOCKET});
      dispatch({type: DISCONNECT_FEED_WEBSOCKET});
    };
  }, [dispatch, isProfileAvailable]);

  return (
    <div className={styles.app}>
      <Router basename={'/react-stellar-burger'}>
        <AppHeader />
        <ModalSwitch />
      </Router >
    </div >
  );
};

export default App;
