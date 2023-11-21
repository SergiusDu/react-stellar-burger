import {Middleware, MiddlewareAPI} from 'redux';
import {TAppDispatch, RootState} from '../store/store';
import {isTWsActions, TWsActions} from '../../utils/types';

export const socketMiddleware = (): Middleware => {
  const socketMap = new Map<string, WebSocket>();
  return (store: MiddlewareAPI<TAppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: TAppDispatch) => (action: TWsActions) => {
      const {
        dispatch,
      } = store;
      const {
        type,
        payload,
      } = action;
      if (socketMap.has(type)) {
        const socketToClose = socketMap.get(type);
        if (socketToClose) {
          socketToClose.close();
          socketMap.delete(type);
        }
        return next(action);
      }
      else if (!isTWsActions(action)) {
        return next(action);
      }
      const {
        wsConnect,
        wsDisconnect,
      } = payload;
      const {
        onOpen,
        onClose,
        onError,
        onMessage,
      } = action.payload;
      if (type === wsConnect) {
        if (socketMap.has(wsDisconnect)) {
          return next(action);
        }
        socket = new WebSocket(payload.url);
        socketMap.set(payload.wsDisconnect, socket);
        const socketRef = socket;
        socket.onopen = (event: Event) => {
          if (socketRef && onOpen) {
            dispatch({
              type: onOpen,
              payload: event,
            });
          }
        };
        socket.onclose = (event: CloseEvent) => {
          if (socket) {
            socketMap.delete(wsDisconnect);
          }
          if (socketRef && onClose) {
            dispatch({
              type: onClose,
              payload: event,
            });
          }
        };
        socket.onerror = (event: Event) => {
          console.log('Ошибка вебсокета', event);
          if (onError && socketRef) {
            dispatch({
              type: onError,
              payload: event,
            });
          }
        };
        socket.onmessage = (event: MessageEvent) => {
          try {
            const parsedData = JSON.parse(event.data);
            if (onMessage) {
              dispatch({
                type: onMessage,
                payload: parsedData,
              });
            }
          }
          catch (error) {
            console.error('Ошибка при разборе сообщения:', error);
          }
        };
      }
      return next(action);
    };
  };
};