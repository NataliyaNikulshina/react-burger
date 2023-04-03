import {
    POST_ORDER_DETAILS_REQUEST,
    POST_ORDER_DETAILS_ERROR,
    POST_ORDER_DETAILS_SUCCESS,
    POST_ORDER_DETAILS_RESET,
    // SET_CURRENT_ORDER,
    // RESET_CURRENT_ORDER,
  } from "../actions/order";
  import { TOrderAction } from '../actions/order';
  import { IOrderInfo, IOrder } from '../types/data';

  
  export interface IOrderInitialState {
    order: IOrder | undefined,
    orderRequest: boolean,
    orderError: boolean,
    orderErrorText: string | undefined
  }

  const initialState: IOrderInitialState = {
    order: undefined,
    orderRequest: false,
    orderError: false,
    orderErrorText: undefined,
  };
  
  export const orderReducer = (state = initialState, action: TOrderAction): IOrderInitialState => {
    switch (action.type) {

      case POST_ORDER_DETAILS_REQUEST:
        return { ...state, orderRequest: true };

      case POST_ORDER_DETAILS_SUCCESS:
        return {
          ...state,
          orderRequest: false,
          orderError: false,
          order: action.payload,
        };

      case POST_ORDER_DETAILS_ERROR:
        return {
          ...state,
          orderRequest: false,
          orderError: true,
          orderErrorText: action.errorText,
        };

      case POST_ORDER_DETAILS_RESET:
        return { ...state, order: undefined };

      // case SET_CURRENT_ORDER:
      //   return { ...state, currentOrder: action.payload };

      // case RESET_CURRENT_ORDER:
      //   return { ...state, currentOrder: undefined };

      default:
        return state;
    }
  }