import { getProductData } from "../../utils/api";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";

export function getItems() {
  return function (dispatch) {
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
