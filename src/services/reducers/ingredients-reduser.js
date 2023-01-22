import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_ERROR,
    GET_ITEMS_SUCCESS
  } from '../actions/ingredients';
  
  export const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
  }

  export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ITEMS_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
          itemsFailed: false,
        };
      }
      case GET_ITEMS_SUCCESS: {
        return {
          items: action.payload, 
          itemsFailed: false,
          itemsRequest: false
        };
      }
      case GET_ITEMS_ERROR: {
        return {
          ...state,
          itemsFailed: true,
          itemsRequest: false
        };
      }
      default: {
        return state
      }
    }
  }