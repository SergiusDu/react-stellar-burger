import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import styles from '../app/app.module.css';
import {useDispatch, useSelector} from 'react-redux';
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
import {AppDispatch} from '../../services/store/store';
import {
  CONNECT_FEED_WEBSOCKET,
  CONNECT_PROFILE_WEBSOCKET, DISCONNECT_FEED_WEBSOCKET,
  DISCONNECT_PROFILE_WEBSOCKET,
} from '../../utils/constants';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isProfileAvailable = useSelector(profilePageAvailability);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(setProfilePageAvailable());
    refreshTokensIfNeeded(dispatch);
    const clearAccessToken = getAccessTokenFromCookies()?.split(' ')[1];
    dispatch({type: CONNECT_FEED_WEBSOCKET});
    if (isProfileAvailable && typeof clearAccessToken === 'string') {
      console.log('ЗАПУСКАЮ ВЕБСОКЕТ');
      dispatch({
        type: CONNECT_PROFILE_WEBSOCKET, payload: clearAccessToken,
      });
    }
    else {
      dispatch({type: DISCONNECT_PROFILE_WEBSOCKET});
    }
    return () => {
      dispatch({type: DISCONNECT_PROFILE_WEBSOCKET});
      dispatch({type: DISCONNECT_FEED_WEBSOCKET})
    };
  }, [dispatch, isProfileAvailable]);

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
