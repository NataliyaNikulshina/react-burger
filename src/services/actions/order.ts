import { createOrder } from "../../utils/api";
import { updateToken } from "./user";
import {
  getToken,
  getRefreshToken,
} from "../../hooks/useTokens";
import { IIngredient } from "../types/data";
import { AppDispatch } from "../types/index";

export const POST_ORDER_DETAILS_REQUEST: 'POST_ORDER_DETAILS_REQUEST' = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_ERROR: 'POST_ORDER_DETAILS_ERROR' = "POST_ORDER_DETAILS_ERROR";
export const POST_ORDER_DETAILS_SUCCESS: 'POST_ORDER_DETAILS_SUCCESS' = "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_RESET: 'POST_ORDER_DETAILS_RESET' = "POST_ORDER_DETAILS_RESET";
export const SET_CURRENT_ORDER: 'SET_CURRENT_ORDER' = "SET_CURRENT_ORDER";
export const RESET_CURRENT_ORDER: 'RESET_CURRENT_ORDER' = "RESET_CURRENT_ORDER";

export interface IPostOrderDetailsRequestAction {
  readonly type: typeof POST_ORDER_DETAILS_REQUEST;
}
export interface IPostOrderDetailsErrorAction {
  readonly type: typeof POST_ORDER_DETAILS_ERROR;
}
export interface IPostOrderDetailsSuccessAction {
  readonly type: typeof POST_ORDER_DETAILS_SUCCESS;
  readonly payload: number;
}
export interface IPostOrderDetailsResetAction {
  readonly type: typeof POST_ORDER_DETAILS_RESET;
}
export interface ISetCurrentOrderAction {
  readonly type: typeof SET_CURRENT_ORDER;
}
export interface IResetCurrentOrderAction {
  readonly type: typeof RESET_CURRENT_ORDER;
}

export type TOrderAction =  IPostOrderDetailsRequestAction | IPostOrderDetailsErrorAction | IPostOrderDetailsSuccessAction |
IPostOrderDetailsResetAction | ISetCurrentOrderAction | IResetCurrentOrderAction;

export function createOrderAction (ingredients: IIngredient[], bun: IIngredient) {
  return function (dispatch: AppDispatch) {
    const arrayId = bun
      ? [bun._id, ...ingredients.map((item) => item._id), bun._id]
      : [];
    dispatch({ type: POST_ORDER_DETAILS_REQUEST });
    createOrder(arrayId, getToken())
      .then((res) => {
        dispatch({ type: POST_ORDER_DETAILS_SUCCESS, payload: res });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(updateToken(getRefreshToken()))
          .then((res: any) => {
            return createOrder(arrayId, res.accessToken)
              .then((res) => {
                dispatch({
                  type: POST_ORDER_DETAILS_SUCCESS,
                  payload: res,
                });
              })
              .catch(() => {
                dispatch({
                  type: POST_ORDER_DETAILS_ERROR,
                  errorText: "Ошибка при формировании заказа",
                });
              });
          });
        }
      });
  };
}
