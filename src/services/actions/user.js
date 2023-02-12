import {
  loginUser,
  postRegister,
  logoutUser,
  postEmailForReset,
} from "../../utils/api";
import {
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  resetRefreshToken,
  resetToken,
} from "../../hooks/useTokens";

export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER__SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_ERROR = "const REFRESH_TOKEN_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export function loginUserThunk(dataLogin, callback) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginUser(dataLogin)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res.user,
        });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_USER_ERROR,
        });
      });
  };
}

export function registerUserThunk(data, callback) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    postRegister(data)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: res.user,
        });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER_ERROR,
        });
      });
  };
}

export function logoutThunk(refreshToken, callback) {
  return function (dispatch) {
    logoutUser(refreshToken)
      .then((res) => {
        localStorage.clear();
        resetRefreshToken(res.refreshToken);
        resetToken(res.accessToken);
        dispatch({ type: LOGOUT_USER });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_USER_ERROR,
        });
        alert("Ошибка выхода из личного кабинета");
      });
  };
}

export function forgotPassThunk(email, callback) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    postEmailForReset(email)
      .then((res) => {
        getRefreshToken(res.refreshToken);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: res.message,
        });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
        });
      });
  };
}

export const updateToken = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    updateToken(refreshToken)
      .then((res) => {
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: REFRESH_TOKEN_ERROR,
        });
      });
  };
};
