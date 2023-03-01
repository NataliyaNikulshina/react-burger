import { createOrder } from "../../utils/api";
import { updateToken } from "../actions/user";
import {
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  resetRefreshToken,
  resetToken,
} from "../../hooks/useTokens";

export const POST_ORDER_DETAILS_REQUEST = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_ERROR = "POST_ORDER_DETAILS_ERROR";
export const POST_ORDER_DETAILS_SUCCESS = "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_RESET = "POST_ORDER_DETAILS_RESET";
export const RESET_ORDER = "RESET_ORDER";
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
export const RESET_CURRENT_ORDER = "RESET_CURRENT_ORDER";

export function createOrderAction(ingredients, bun) {
  return function (dispatch) {
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
          .then((res) => {
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
