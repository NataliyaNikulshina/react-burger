import { getProductData } from "../../utils/api";
import { AppDispatch } from "../types/index";

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = "GET_ITEMS_REQUEST";
export const GET_ITEMS_ERROR: 'GET_ITEMS_ERROR' = "GET_ITEMS_ERROR";
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = "GET_ITEMS_SUCCESS";

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsErrorAction {
  readonly type: typeof GET_ITEMS_ERROR;
}
export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
}

export type TGetItemsActions = IGetItemsRequestAction | IGetItemsErrorAction | IGetItemsSuccessAction;

const getItemsRequest = (): IGetItemsRequestAction => {
  return {
    type: GET_ITEMS_REQUEST,
  };
};

const getItemsError = (): IGetItemsErrorAction => {
  return {
    type: GET_ITEMS_ERROR,
  };
};

const getItemsSuccess = (): IGetItemsSuccessAction => {
  return {
    type: GET_ITEMS_SUCCESS,
  };
};


// const getItemsSuccess = (
//   ingredients: Array<IIngredient>
// ): IGetIngredientsSuccess => {
//   return {
//     type: GET_INGREDIENTS_SUCCESS,
//     payload: ingredients,
//   };
// };

// const getItemsFailed = (text: string): TGetItemsActions => {
//   return {
//     type: GET_INGREDIENTS_FAILED,
//     errorText: text,
//   };
// };


export function getItems() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getProductData()
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_ERROR,
        });
      });
  };
}
