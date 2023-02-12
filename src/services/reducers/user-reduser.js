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
} from "../actions/user";

const initialState = {
  userData: null,

  isAuth: undefined,

  registerUserRequest: false,
  registerUserError: null,

  loginUserRequest: false,
  loginUserError: null,

  forgotPasswordRequest: false,
  forgotPasswordError: false,

  refreshTokenRequest: false,
  refreshTokenError: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserError: null,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
        },
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
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        loginUserRequest: false,
        loginUserERROR: false,
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserERROR: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
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
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
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

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};
