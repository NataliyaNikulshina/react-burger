import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app.jsx";
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './services/reducers';

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

 const enhancer = composeEnhancers();*/

// Инициализируем хранилище с помощью корневого редьюсера
//const store = createStore(rootReducer, enhancer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
