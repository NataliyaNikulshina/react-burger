import {Middleware} from "redux";
// import {
//   WS_CONNECTION_START,  
//   WS_CONNECTION_SUCCESS,
//   WS_CONNECTION_ERROR,
//   WS_CONNECTION_CLOSE,
//   WS_CONNECTION_CLOSED,
//   WS_GET_MESSAGE,
//   TWsFeedAction,

// } from "../actions/feed-ws";
// import {
//   WS_CONNECTION_START as WS_USER_CONNECTION_START,  
//   WS_CONNECTION_SUCCESS as WS_USER_CONNECTION_SUCCESS,
//   WS_CONNECTION_ERROR as WS_USER_CONNECTION_ERROR,
//   WS_CONNECTION_CLOSE as WS_USER_CONNECTION_CLOSE, 
//   WS_CONNECTION_CLOSED as WS_USER_CONNECTION_CLOSED,
//   WS_GET_MESSAGE as WS_USER_GET_MESSAGE,
//   TWsUserAction
// } from "../actions/user-ws";

// export interface IWsActions {
//   startType: WS_CONNECTION_START | WS_USER_CONNECTION_START,
//   closetType: WS_CONNECTION_CLOSED | WS_USER_CONNECTION_CLOSE,
//   onError: WS_CONNECTION_ERROR | WS_USER_CONNECTION_CLOSED,
//   onMessage: WS_GET_MESSAGE | WS_USER_GET_MESSAGE
// }

export interface IWebSocket {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onClosed: string;
  onError: string;
  onMessage: string;
}

export const socketMiddleware = (wsActions: IWebSocket): Middleware => {
    return (store) => {
      let socket: WebSocket | null = null;
      let reconnectTimer = 0;
      let url: string | URL = '';
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onClosed, onError, onMessage } =
          wsActions;
 
        if (type === wsInit) {
          url = payload;
          socket = new WebSocket(url);
        } else if (type === onClose) {
          socket!.close(1000, "CLOSE_NORMAL");
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;
        }
  
        if (socket) {
          socket.onopen = (event) => {          
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event) => {          
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            if (
              restParsedData.message === "Invalid or missing token" ||
              restParsedData.message === "jwt expired"
            ) {            
              dispatch({ type: onError, payload: restParsedData.message });
            } else {            
              dispatch({ type: onMessage, payload: restParsedData });
            }
          };
  
          socket.onclose = (event) => {          
            if (event.code !== 1000) {
              reconnectTimer = window.setTimeout(() => {
                dispatch({ type: wsInit, payload: url });
              }, 10000);
            }
  
            dispatch({ type: onClosed, payload: event });
          };
        }
  
        next(action);
      };
    };
  };