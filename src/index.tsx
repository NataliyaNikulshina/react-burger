import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";

import { BrowserRouter } from 'react-router-dom';


/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

 const enhancer = composeEnhancers();*/

// Инициализируем хранилище с помощью корневого редьюсера
//const store = createStore(rootReducer, enhancer);



const root = createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
