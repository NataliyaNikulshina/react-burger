import { getProductData } from "../../utils/api";
import { AppDispatch } from "../types/index";
import { IIngredient } from "../types/data";

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
  readonly payload: IIngredient[];
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

const getItemsSuccess = (items: IIngredient[]): IGetItemsSuccessAction => {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: items
  };
};

export function getItems() {
  return function (dispatch: AppDispatch) {
    dispatch(getItemsRequest());
    getProductData()
      .then((res) => {
        dispatch(getItemsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getItemsError());
      });
  };
}
