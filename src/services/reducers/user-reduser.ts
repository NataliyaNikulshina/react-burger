import {
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  CHECK_USER_ERROR,
} from "../actions/user";
import { TUserAction } from '../actions/user';
import { IUserRegister, IUserLogin, IUser } from '../types/data';

export interface IUserInitialState {
  userData: IUserRegister | IUserLogin | IUser | null,

  isAuth: boolean,

  registerUserRequest: boolean,
  registerUserError: boolean,

  loginUserRequest: boolean,
  loginUserError: boolean,

  forgotPasswordRequest: boolean,
  forgotPasswordError: boolean,

  resetPasswordRequest: boolean,
  reserPasswordError: boolean,

  refreshTokenRequest: boolean,
  refreshTokenError: boolean,

  updateUserRequest: boolean,
  updateUserError: boolean,

  checkUserRequest: boolean,
  checkUserError: boolean
}

const initialState: IUserInitialState = {
  userData: null,

  isAuth: false,

  registerUserRequest: false,
  registerUserError: false,

  loginUserRequest: false,
  loginUserError: false,

  forgotPasswordRequest: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  reserPasswordError: false,

  refreshTokenRequest: false,
  refreshTokenError: false,

  updateUserRequest: false,
  updateUserError: false,

  checkUserRequest: false,
  checkUserError: false,
};

export const userReducer = (state = initialState, action:TUserAction): IUserInitialState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserError: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        registerUserRequest: false,
        registerUserError: false,
      };
    }

    case REGISTER_USER_ERROR: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: true,
      };
    }

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        loginUserError: false,
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        loginUserRequest: false,
        loginUserError: false,
        isAuth: true,
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordError: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        forgotPasswordRequest: false,
        forgotPasswordError: false,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: true,
      };
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenError: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
       // userData: action.payload,
        refreshTokenRequest: false,
        refreshTokenError: false,
      };
    }
    case REFRESH_TOKEN_ERROR: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenError: true,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        reserPasswordError: false,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        resetPasswordRequest: false,
        reserPasswordError: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        reserPasswordError: true,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserError: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: false,
        userData: {
          ...state.userData,
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: true,
      };
    }

    case CHECK_USER_REQUEST: {
      return {
        ...state,
        checkUserRequest: true,
        checkUserError: false,
      };
    }
    case CHECK_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        checkUserRequest: false,
        checkUserError: false,
      };
    }
    case CHECK_USER_ERROR: {
      return {
        ...state,
        checkUserRequest: false,
        checkUserError: true,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
      };
    }

    default:
      return state;
  }
};
