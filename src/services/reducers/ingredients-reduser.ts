import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_ERROR,
    GET_ITEMS_SUCCESS
  } from '../actions/ingredients';
import { TGetItemsActions } from '../actions/ingredients'
import { IIngredient } from '../types/data';
  
export interface IIngredientsInitialState {
    items: IIngredient[],
    itemsRequest: boolean,
    itemsFailed: boolean
  }

export const initialState: IIngredientsInitialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
  }

  export const ingredientsReducer = (state = initialState, action: TGetItemsActions): IIngredientsInitialState => {
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