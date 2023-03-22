import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from "../services/middleware/socketMiddleware";
import {
    WS_CONNECTION_START,  
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
  } from "../services/actions/feed-ws";
  import {
    WS_CONNECTION_START as WS_USER_CONNECTION_START,  
    WS_CONNECTION_SUCCESS as WS_USER_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR as WS_USER_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE as WS_USER_CONNECTION_CLOSE, 
    WS_CONNECTION_CLOSED as WS_USER_CONNECTION_CLOSED,
    WS_GET_MESSAGE as WS_USER_GET_MESSAGE
  } from "../services/actions/user-ws";

const wsFeedActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSE,
  onClosed: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE,
};

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk,socketMiddleware(wsFeedActions), socketMiddleware(wsUserActions))));
