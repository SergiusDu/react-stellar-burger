import {AnyAction, Dispatch, MiddlewareAPI} from 'redux';
import {updateOrdersInformation} from '../slices/feed-slice';
import {getAccessTokenFromCookies} from '../../utils/api';
import {isValidOrderResponse} from '../../utils/types';

type WebsocketAction = {
  type: string; payload?: any;
}

export const websocketMiddleware = (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  const reconnect = (actionPayload: string) => {
    // Очищаем текущий таймаут, если он был установлен
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
    // Устанавливаем задержку перед попыткой переподключения
    reconnectTimeout = setTimeout(() => {
      store.dispatch({
        type: 'feedSlice/WEBSOCKET_CONNECT', payload: actionPayload,
      });
    }, 5000); // Переподключаемся через 5 секунд
  };
  const onOpen = (ws: WebSocket, store: MiddlewareAPI) => (evt: Event) => {
    console.log('WebSocket connection opened');
  };
  const onClose = (ws: WebSocket, store: MiddlewareAPI,
    payload: string,
  ) => (evt: CloseEvent) => {
    console.log('WebSocket connection closed');
    if (evt.code !== 1000) {
      console.error(`Вебсокет был закрыт неожиданно, с кодом ${evt.code}`);
      if (getAccessTokenFromCookies()) {
        const clearToken = getAccessTokenFromCookies()?.split(' ')[1];
        if (typeof clearToken === 'string') {
          reconnect(clearToken);
        }
      }
    }
  };
  const onMessage = (
    ws: WebSocket, store: MiddlewareAPI) => (evt: MessageEvent) => {
    console.log('WebSocket got message: ');
    const response = JSON.parse(evt.data);
    console.log(response);
    if (response.success && isValidOrderResponse(response)) {
      store.dispatch(updateOrdersInformation(response));
    }
  };
  const onError = (ws: WebSocket, store: MiddlewareAPI) => (evt: any) => {
    console.error('Websocket got error: ');
    console.log(evt);
  };
  return (next: Dispatch<AnyAction>) => (action: WebsocketAction) => {
    switch (action.type) {
      case 'feedSlice/WEBSOCKET_CONNECT':
        if (socket !== null) {
          socket.close();
        }
        const GET_ORDERS_WS_ENDPOINT = `wss://norma.nomoreparties.space/orders?token=${action.payload}`;
        socket = new WebSocket(GET_ORDERS_WS_ENDPOINT);
        socket.onopen = onOpen(socket, store);
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store, GET_ORDERS_WS_ENDPOINT);
        socket.onerror = onError(socket, store);
        break;
      case 'feedSlice/WEBSOCKET_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      default:
        return next(action);
    }
  };
};