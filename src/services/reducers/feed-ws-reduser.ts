import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
  } from "../actions/feed-ws";
  import { TWsFeedAction } from '../actions/feed-ws';
  import { IOrderInfo } from '../types/data';
  
  export interface IWsFeedInitialState {
    wsConnected: boolean,
    orders: IOrderInfo[],
    total: number,
    totalToday: number,
    errorState: boolean,
    errorMessage: null | string,
  }

  const initialState: IWsFeedInitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    errorState: false,
    errorMessage: null,
  };
  
  export const feedWsReducer = (state = initialState, action: TWsFeedAction): IWsFeedInitialState => {
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
          orders: action.payload.orders.reverse(),
          total: action.payload.total,
          totalToday: action.payload.totalToday,        
        };
  
      default:
        return state;
    }
  }