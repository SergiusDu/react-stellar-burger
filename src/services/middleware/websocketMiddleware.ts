import {AnyAction, Dispatch, MiddlewareAPI} from 'redux';
import {
  updateAllOrdersInformation,
  updateProfileOrdersInformation,
} from '../slices/feed-slice';
import {getAccessTokenFromCookies} from '../../utils/api';
import {isValidOrderResponse} from '../../utils/types';

type WebsocketAction = {
  type: string;
  payload?: any;
}

export const websocketMiddleware = (store: MiddlewareAPI) => {
  let profileOrdersWebSocket: WebSocket | null = null;
  let feedOrdersWebSocket: WebSocket | null = null;
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  const reconnect = (actionPayload: string) => {
    // Очищаем текущий таймаут, если он был установлен
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
    // Устанавливаем задержку перед попыткой переподключения
    reconnectTimeout = setTimeout(() => {
      store.dispatch({
        type: 'feedSlice/WEBSOCKET_CONNECT',
        payload: actionPayload,
      });
    }, 5000); // Переподключаемся через 5 секунд
  };
  const onOpenProfileSocket = (
    ws: WebSocket,
    store: MiddlewareAPI,
  ) => (evt: Event) => {
  };
  const onCloseProfileSocket = (ws: WebSocket,
    store: MiddlewareAPI,
    payload: string,
  ) => (evt: CloseEvent) => {
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
  const onMessageProfileSocket = (
    ws: WebSocket,
    store: MiddlewareAPI,
  ) => (evt: MessageEvent) => {
    const response = JSON.parse(evt.data);
    if (response.success && isValidOrderResponse(response)) {
      store.dispatch(updateProfileOrdersInformation(response));
    }
  };
  const onMessageFeedSocket = (
    ws: WebSocket,
    store: MiddlewareAPI,
  ) => (evt: MessageEvent) => {
    const response = JSON.parse(evt.data);
    if(response.success && isValidOrderResponse(response)){
      store.dispatch(updateAllOrdersInformation(response));
    }
  };
  const onClose = (
    ws: WebSocket,
    store: MiddlewareAPI,
  ) => (evt: CloseEvent) => {
    console.log(evt);
  };
  const onError = (
    ws: WebSocket,
    store: MiddlewareAPI,
  ) => (evt: any) => {
    console.error('Websocket got error: ');
    console.log(evt);
  };
  return (next: Dispatch<AnyAction>) => (action: WebsocketAction) => {
    switch (action.type) {
      case 'profileSlice/WEBSOCKET_CONNECT':
        if (profileOrdersWebSocket !== null) {
          profileOrdersWebSocket.close();
        }
        const GET_ORDERS_WS_ENDPOINT = `wss://norma.nomoreparties.space/orders?token=${action.payload}`;
        profileOrdersWebSocket = new WebSocket(GET_ORDERS_WS_ENDPOINT);
        profileOrdersWebSocket.onopen =
          onOpenProfileSocket(profileOrdersWebSocket, store);
        profileOrdersWebSocket.onmessage =
          onMessageProfileSocket(profileOrdersWebSocket, store);
        profileOrdersWebSocket.onclose =
          onCloseProfileSocket(profileOrdersWebSocket, store,
            GET_ORDERS_WS_ENDPOINT,
          );
        profileOrdersWebSocket.onerror =
          onError(profileOrdersWebSocket, store);
        break;
      case 'profileSlice/WEBSOCKET_DISCONNECT':
        if (profileOrdersWebSocket !== null) {
          profileOrdersWebSocket.close();
        }
        profileOrdersWebSocket = null;
        break;
      case 'feedSlice/WEBSOCKET_CONNECT':
        if (feedOrdersWebSocket !== null) {
          feedOrdersWebSocket.close();
        }
        const GET_ALL_ORDERS_WS_ENDPOINT = `wss://norma.nomoreparties.space/orders/all`;
        feedOrdersWebSocket = new WebSocket(GET_ALL_ORDERS_WS_ENDPOINT);
        feedOrdersWebSocket.onmessage =
          onMessageFeedSocket(feedOrdersWebSocket, store);
        feedOrdersWebSocket.onclose =
          onClose(feedOrdersWebSocket, store);
        feedOrdersWebSocket.onerror = onError(feedOrdersWebSocket, store);
        feedOrdersWebSocket.onclose = onClose(feedOrdersWebSocket, store);

        break;
      case 'feedSlice/WEBSOCKET_DISCONNECT': {
        if (feedOrdersWebSocket !== null) {
          feedOrdersWebSocket.close();
        }
        feedOrdersWebSocket = null;
        break;
      }
      default:
        return next(action);
    }
  };
};