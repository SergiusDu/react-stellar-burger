import {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from '../store/store';

// Определяем отдельный тип для payload
export interface TWsActionsPayload {
  url: string;
  wsConnect: string;
  wsDisconnect: string;
  onOpen?: string;
  onClose?: string;
  onError?: string;
  onMessage?: string;
}

// Определяем интерфейс TWsActions с использованием нового типа payload
export interface TWsActions extends AnyAction {
  type: string;
  payload: TWsActionsPayload;
}

export function isTWsActions(action: AnyAction): action is TWsActions {
  // Проверяем, является ли action объектом и не равен ли он null
  if (typeof action !== 'object' || action === null) {
    return false;
  }

  // Проверяем наличие и тип свойства type у action
  const hasType = 'type' in action && typeof action.type === 'string';

  // Проверяем наличие свойства payload и что оно является объектом и не равно null
  const hasPayload = 'payload' in action && action.payload !== null && typeof action.payload === 'object';

  if (!hasType || !hasPayload) {
    return false;
  }

  // Теперь безопасно приводим payload к типу TWsActionsPayload
  const payload = action.payload as TWsActionsPayload;

  // Проверяем наличие и тип свойств в payload
  const hasUrl = 'url' in payload && typeof payload.url === 'string';
  const hasWsConnect = 'wsConnect' in payload && typeof payload.wsConnect === 'string';
  const hasWsDisconnect = 'wsDisconnect' in payload && typeof payload.wsDisconnect === 'string';

  // Проверка опциональных полей
  const hasOnOpen = !payload.onOpen || typeof payload.onOpen === 'string';
  const hasOnClose = !payload.onClose || typeof payload.onClose === 'string';
  const hasOnError = !payload.onError || typeof payload.onError === 'string';
  const hasOnMessage = !payload.onMessage || typeof payload.onMessage === 'string';

  return hasUrl && hasWsConnect && hasWsDisconnect && hasOnOpen && hasOnClose && hasOnError && hasOnMessage;
}


export const socketMiddleware = (): Middleware => {
  const socketMap = new Map<string, WebSocket>();

  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: AppDispatch) => (action: TWsActions) => {
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