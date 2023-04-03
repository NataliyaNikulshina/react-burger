import {
  loginUser,
  postRegister,
  logoutUser,
  postEmailForReset,
  postNewPassword,
  getUserInfo,
  updateUserInfo,
  updateAccessToken
} from "../../utils/api";
import {
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  resetRefreshToken,
  resetToken,
} from "../../hooks/useTokens";
import { AppDispatch } from "../types/index";
import { IUserRegister, IUserLogin, IUser } from "../types/data";

export const LOGOUT_USER: 'LOGOUT_USER' = "LOGOUT_USER";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR: 'REGISTER_USER_ERROR' = "REGISTER_USER_ERROR";

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR: 'LOGIN_USER_ERROR' = "LOGIN_USER_ERROR";

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_ERROR: 'REFRESH_TOKEN_ERROR' = "REFRESH_TOKEN_ERROR";

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR' = "RESET_PASSWORD_ERROR";

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = "UPDATE_USER_REQUEST";
export const UPDATE_USER_ERROR: 'UPDATE_USER_ERROR' = "UPDATE_USER_ERROR";
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = "UPDATE_USER_SUCCESS";

export const CHECK_USER_REQUEST: 'CHECK_USER_REQUEST' = "CHECK_USER_REQUEST";
export const CHECK_USER_SUCCESS: 'CHECK_USER_SUCCESS' = "CHECK_USER_SUCCESS";
export const CHECK_USER_ERROR: 'CHECK_USER_ERROR' = "CHECK_USER_ERROR";

export interface ILogoutUsertAction {
  readonly type: typeof LOGOUT_USER;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: IUserRegister;
}
export interface IRegisterUserErrorAction {
  readonly type: typeof REGISTER_USER_ERROR;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: IUserLogin;
}
export interface ILoginUserErrorAction {
  readonly type: typeof LOGIN_USER_ERROR;
}

export interface IRefreshUserRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshUserSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly payload: string;
}
export interface IRefreshUserErrorAction {
  readonly type: typeof REFRESH_TOKEN_ERROR;
}

export interface IForgotUserRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotUserSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly payload: IUserLogin;
}
export interface IForgotUserErrorAction {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: IUserLogin;
}
export interface IResetPasswordErrorAction {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: IUser;
}
export interface IUpdateUserErrorAction {
  readonly type: typeof UPDATE_USER_ERROR;
}

export interface ICheckUserRequestAction {
  readonly type: typeof CHECK_USER_REQUEST;
}
export interface ICheckUserSuccessAction {
  readonly type: typeof CHECK_USER_SUCCESS;
  readonly payload: IUserRegister;
}
export interface ICheckUserErrorAction {
  readonly type: typeof CHECK_USER_ERROR;
}


export type TUserAction =  ILogoutUsertAction | IRegisterUserRequestAction | IRegisterUserSuccessAction |
IRegisterUserErrorAction | ILoginUserRequestAction | ILoginUserSuccessAction | ILoginUserErrorAction | IForgotUserRequestAction |
IForgotUserSuccessAction | IForgotUserErrorAction | IRefreshUserRequestAction | IRefreshUserSuccessAction | IRefreshUserErrorAction|
IResetPasswordRequestAction | IResetPasswordSuccessAction | IResetPasswordErrorAction | IUpdateUserRequestAction | IUpdateUserSuccessAction |
IUpdateUserErrorAction | ICheckUserRequestAction | ICheckUserSuccessAction | ICheckUserErrorAction;

export const logoutUserSuccess = (): ILogoutUsertAction => ({
  type: LOGOUT_USER,
});

export const loginUserRequest = (): ILoginUserRequestAction => ({
   type: LOGIN_USER_REQUEST 
 });
export const loginUserSuccess = (user: IUserLogin): ILoginUserSuccessAction => ({
   type: LOGIN_USER_SUCCESS,
   payload: user
 });
export const loginUserError = (): ILoginUserErrorAction => ({
  type: LOGIN_USER_ERROR 
});

export const registerUserRequest = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST 
});
export const registerUserSuccess = (user: IUserRegister): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
});
export const registerUserError = (): IRegisterUserErrorAction => ({
  type: REGISTER_USER_ERROR 
});

export const updateUserRequest = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST 
});
export const updateUserSuccess = (user: IUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});
export const updateUserError = (): IUpdateUserErrorAction => ({
  type: UPDATE_USER_ERROR 
});

export const forgotUserRequest = (): IForgotUserRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST 
});
export const forgotUserSuccess = (user: IUserLogin): IForgotUserSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: user
});
export const forgotUserError = (): IForgotUserErrorAction => ({
  type: FORGOT_PASSWORD_ERROR 
});

export const resetPassUserRequest = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST 
});
export const resetPassUserSuccess = (user: IUserLogin): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: user
});
export const resetPassUserError = (): IResetPasswordErrorAction => ({
  type: RESET_PASSWORD_ERROR
});

export const updateTokenRequest = (): IRefreshUserRequestAction => ({
  type: REFRESH_TOKEN_REQUEST 
});
export const updateTokenSuccess = (refreshToken: string): IRefreshUserSuccessAction => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: refreshToken
});
export const updateTokenError = (): IRefreshUserErrorAction => ({
  type: REFRESH_TOKEN_ERROR
});

export const checkUserRequest = (): ICheckUserRequestAction => ({
  type: CHECK_USER_REQUEST 
});
export const checkUserSuccess = (user: IUserRegister): ICheckUserSuccessAction => ({
  type: CHECK_USER_SUCCESS,
  payload: user
});
export const checkUserError = (): ICheckUserErrorAction => ({
  type: CHECK_USER_ERROR
});



export function loginUserThunk(dataLogin: IUserLogin) {
  return function (dispatch: AppDispatch) {
    dispatch(loginUserRequest());
    loginUser(dataLogin)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch(loginUserSuccess(res.user));
      })
      .catch(() => {
        dispatch(loginUserError());
      });
  };
}

export function registerUserThunk(data: IUserRegister , callback: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch(registerUserRequest());
    postRegister(data)
      .then((res) => {
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch(registerUserSuccess(res.user));
        callback();
      })
      .catch(() => {
        dispatch(registerUserError);
      });
  };
}

export const logoutThunk = ( refreshToken: string, callback: () => void ) => {
  return function (dispatch: AppDispatch) {
     logoutUser(refreshToken)
      .then(() => {
        localStorage.clear();
        resetRefreshToken();
        resetToken();
        dispatch(logoutUserSuccess());
        callback();
      })
      .catch(() => {
        alert("Ошибка выхода из личного кабинета");
      });
  };
}

export function forgotPassThunk( email: string, callback: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch(forgotUserRequest());
    postEmailForReset(email)
      .then((res) => {
        getRefreshToken();
        console.log(res);
        dispatch(forgotUserSuccess(res.user));
        callback();
      })
      .catch(() => {
        dispatch(forgotUserError());
      });
  };
}

export function resetPassThunk(password: string, code: string, callback: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch(resetPassUserRequest());
    postNewPassword(password, code)
      .then((res) => {
        console.log(res);
        dispatch(resetPassUserSuccess(res.user));
        callback();
      })
      .catch(() => {
        dispatch(resetPassUserError());
      });
  };
}

export const updateTokenThunk = (refreshToken: string | null) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateTokenRequest());
   // console.log('в  updateToken ' + refreshToken);
   return updateAccessToken(refreshToken)
      .then((res) => {
        //console.log('обнова токена')
       // console.log(res)
        setRefreshToken(res.refreshToken);
        setToken(res.accessToken);
        dispatch(updateTokenSuccess(res)); 
      })
      .catch(() => {
      //  console.log('обнова токена не вышла')
        dispatch(updateTokenError());
      });
  };
};

export const updateUserDataThunk = (data: IUser, refreshToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserRequest());
    updateUserInfo(data, refreshToken)
      .then((res) => {
       // console.log(res)
        dispatch(updateUserSuccess(res.user));
      })
      .catch((err) => {
        if (err.message === "jwt expired" || err.message === "jwt malformed") {
         // console.log('я тут')
          const tok = getRefreshToken();
          dispatch(updateTokenThunk(getRefreshToken()))
          .then(() => {
            updateUserInfo(data, refreshToken)
              .then((res) => {
                dispatch(updateUserSuccess(res.user));
              })
              .catch(() => {
                dispatch(updateUserError());
              });
          });
        }
      });
  };
};

export function checkUserThunk() {
  return function (dispatch: AppDispatch) {
  dispatch(checkUserRequest());
    getUserInfo(getToken())
    .then((res) => {
      //console.log(res)
      dispatch(checkUserSuccess(res.user));
    })
    .catch((err) => {
      dispatch(checkUserError());
      if (err.message === "jwt expired" || "jwt malformed") {
        dispatch(updateTokenThunk(getRefreshToken()))
        .then(() => {
          getUserInfo(getToken())
            .then((res_1) => {
              dispatch(checkUserSuccess(res_1.user));
            })
            .catch((err_1) => {
              dispatch(checkUserError());
            //  console.log("не сработало checkUser in action", err_1);
            });
        });
      }
    });
};
}

