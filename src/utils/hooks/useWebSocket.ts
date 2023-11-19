import {TWsActions} from '../../services/middleware/websocketMiddleware';
import {useAppDispatch} from './reduxHooks';
import {useEffect} from 'react';

/**
 * Хук для управления WebSocket подключением и отключением.
 * @param websocketActions Объект действий WebSocket для подключения и
 *   отключения.
 * @param socketStatus Статус подключения WebSocket
 */
function useWebSocket(
  websocketActions: TWsActions | null | undefined,
  socketStatus: boolean | null | undefined,
) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!websocketActions || socketStatus) {
      return;
    }
    else if (!socketStatus) {
      dispatch({...websocketActions});
    }
    return () => {
      if (socketStatus) {
        dispatch({type: websocketActions.payload.wsDisconnect});
      }
    };
  }, [dispatch, socketStatus, websocketActions]);
}



export default useWebSocket;
