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

const initialState = {
  userData: null,

  isAuth: undefined,

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

  checkUserRequest: false,
  checkUserError: false,
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

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetUserRequest: true,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        resetUserRequest: false,
        resetUserERROR: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetUserRequest: false,
        resetUserERROR: true,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateDataRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateDataRequest: false,
        updateDataError: false,
        userData: {
          ...state.data,
        },
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        updateDataRequest: false,
        updateDataError: true,
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
        userData: {
          ...state.userData,
          email: action.payload.email,
          name: action.payload.name,
        },
        isAuth: true,
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
