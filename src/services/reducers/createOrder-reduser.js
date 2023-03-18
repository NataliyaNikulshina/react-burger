import {
    POST_ORDER_DETAILS_REQUEST,
    POST_ORDER_DETAILS_ERROR,
    POST_ORDER_DETAILS_SUCCESS,
    POST_ORDER_DETAILS_RESET,
    SET_CURRENT_ORDER,
    RESET_CURRENT_ORDER,
  } from "../actions/order";
  
  const initialState = {
    order: undefined,
    orderRequest: false,
    orderError: false,
    orderErrorText: undefined,
    currentOrder: undefined,
  };
  
  export default function createOrderReducer(
    state = initialState, action
  ) {
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
  
      case SET_CURRENT_ORDER:
        return { ...state, currentOrder: action.payload };
  
      case RESET_CURRENT_ORDER:
        return { ...state, currentOrder: undefined };
  
      default:
        return state;
    }
  }