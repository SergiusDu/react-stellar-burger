import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {FEED_PAGE_PATH, PROFILE_ORDERS_PATH} from '../constants';
import useWebSocket from './useWebSocket';
import {createWebSocketProfileOrdersAction} from '../api';
import {
  FeedWebsocketActions, selectWebSocketStatus,
} from '../../services/slices/feed-slice';
import {useAppSelector} from './reduxHooks';
import {
  selectProfileOrdersWebSocketStatus,
} from '../../services/slices/profile-slice';
import {TWsActions} from '../types';

function useOrdersWebSocketHandler() {
  const pathname = useLocation().pathname;
  const isFeedWebSocketWorking = useAppSelector(selectWebSocketStatus);
  const isProfileWebSocketWorking = useAppSelector(
    selectProfileOrdersWebSocketStatus);
  const [wsActions, setWsActions] = useState<TWsActions | null>(null);
  const [socketStatus, setSocketStatus] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname.includes(PROFILE_ORDERS_PATH)) {
      setWsActions(createWebSocketProfileOrdersAction());
      setSocketStatus(isProfileWebSocketWorking);
    }
    else if (pathname.includes(FEED_PAGE_PATH)) {
      setWsActions(FeedWebsocketActions);
      setSocketStatus(isFeedWebSocketWorking);
    }
  }, [isFeedWebSocketWorking, isProfileWebSocketWorking, pathname]);
  useWebSocket(wsActions, socketStatus);
}

export default useOrdersWebSocketHandler;