import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
  } from "../actions/feed-ws";
  
  const initialState = {
    wsConnected: false,
    orders: [],
    errorState: false,
    errorMessage: null,
  };
  
  export const userWsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,        
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          errorState: true,
          errorMessage: action.payload,
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          errorState: false,
          errorMessage: null,
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          wsConnected: false,
          errorState: true,
          errorMessage: null,
          orders: action.payload.orders.reverse(),       
        };
  
      default:
        return state;
    }
  }