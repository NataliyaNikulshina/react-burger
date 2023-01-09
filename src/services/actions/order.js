import { postOrderDetails } from "../../utils/api";

export const POST_ORDER_DETAILS_REQUEST = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_ERROR = "POST_ORDER_DETAILS_ERROR";
export const POST_ORDER_DETAILS_SUCCESS = "POST_ORDER_DETAILS_SUCCESS";

export function postOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_DETAILS_REQUEST,
    });
    postOrderDetails(ingredients)
      .then((res) => {
        dispatch({
          type: POST_ORDER_DETAILS_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_DETAILS_ERROR,
        });
      });
  };
}
