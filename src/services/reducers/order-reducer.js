import {
  POST_ORDER_DETAILS_REQUEST,
  POST_ORDER_DETAILS_ERROR,
  POST_ORDER_DETAILS_SUCCESS,
  POST_ORDER_DETAILS_RESET,
} from "../actions/order";

export const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNum: "",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case POST_ORDER_DETAILS_SUCCESS: {
      return {
        orderNum: action.payload,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case POST_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case POST_ORDER_DETAILS_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
