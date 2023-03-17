import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from "../services/middleware/socketMiddlewareFeed";
import {
    WS_CONNECTION_START,  
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
  } from "../services/actions/feed-ws";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk,socketMiddleware(wsActions))));
