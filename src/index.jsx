import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app.jsx";
import { applyMiddleware, createStore, compose } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers";
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddlewareFeed';
import {
  WS_CONNECTION_START,  
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./services/actions/feed-ws";

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

 const enhancer = composeEnhancers();*/

// Инициализируем хранилище с помощью корневого редьюсера
//const store = createStore(rootReducer, enhancer);

const wsActions = {
  wsInit: WS_CONNECTION_START,  
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk,socketMiddleware(wsActions))));


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
