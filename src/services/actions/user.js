import {
  loginUser,
  postRegister,
  logoutUser,
  postEmailForReset,
  postNewPassword,
  getUserInfo,
  updateUserInfo,
  updateAccessToken,
  updaterefreshToken
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
//export const USER_IS_AUTH = "USER_IS_AUTH";

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

export const CHECK_USER_REQUEST = "CHECK_USER_REQUEST";
export const CHECK_USER_SUCCESS = "CHECK_USER_SUCCESS";
export const CHECK_USER_ERROR = "CHECK_USER_ERROR";

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
        console.log(res);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: res.user,
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

export function resetPassThunk(password, code, callback) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    postNewPassword(password, code)
      .then((res) => {
        console.log(res);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: res.user,
        });
        callback();
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
        });
      });
  };
}

export const updateToken = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    console.log(refreshToken);
    updateAccessToken(refreshToken)
      .then((res) => {
        console.log('обнова токена')
        console.log(res)
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log('обнова токена не вышла')
        dispatch({
          type: REFRESH_TOKEN_ERROR,
        });
      });
  };
};

export const updateUserData = (data, refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserInfo(data, refreshToken)
      .then((res) => {
        console.log(res)
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || err.message === "jwt malformed") {
          console.log('я тут')
          dispatch(updateAccessToken(getRefreshToken(refreshToken)))
          .then(() => {
            updateUserInfo(data, refreshToken)
              .then((res) => {
                dispatch({
                  type: UPDATE_USER_SUCCESS,
                  payload: res.user,
                });
          
              })
              .catch((err) => {
                dispatch({
                  type: UPDATE_USER_ERROR,
                });
              });
          });
        }
      });
  };
};

export function checkUser() {
  return (dispatch) => {
    dispatch({
      type: CHECK_USER_REQUEST,
    });
   return getUserInfo(getToken())
      .then((res) => {
        console.log(res)
        dispatch({ type: CHECK_USER_SUCCESS, payload: res.user })
        console.log('получение информации')
        console.log(res)
      })
      .catch((err) => {
        dispatch({
          type: CHECK_USER_ERROR,
        });
        console.log("надо обновить RefreshToken", err)
        if (err.message === "jwt expired" || err.message === "jwt malformed") {
          dispatch(updateToken(getRefreshToken()))
          .then(() => {
            getUserInfo(getToken())
              .then((res) => {
                dispatch({
                  type: CHECK_USER_SUCCESS,
                  payload: res.user,
                });
          
              })
              .catch((err) => {
                dispatch({
                  type: CHECK_USER_ERROR,
                });
                console.log("не сработало checkUser in action", err)
              });
          });
        }
      })
  }
}
