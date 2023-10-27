import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  UPDATE_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  CLEAR_USER,
  TUserActions,
} from "../actions/user"

type TInitialState = {
  user: {
    email: string,
    name: string,
    password: string,
  },

  isAuth: boolean;

  forgotPasswordRequest: boolean,
  forgotPasswordSuccess: boolean,
  forgotPasswordFailed: boolean,

  resetPasswordRequest: boolean,
  resetPasswordSuccess: boolean,
  resetPasswordFailed: boolean,
  
  createUserRequest: boolean,
  createUserSuccess: boolean,
  createUserFailed: boolean,

  updateUserRequest: boolean,
  updateUserSuccess: boolean,
  updateUserFailed: boolean,

  loginRequest: boolean,
  loginSuccess: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutSuccess: boolean,
  logoutFailed: boolean,
}

const initialState: TInitialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },

  isAuth: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  
  createUserRequest: false,
  createUserSuccess: false,
  createUserFailed: false,

  updateUserRequest: false,
  updateUserSuccess: false,
  updateUserFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,
};

export const userReducer = (state = initialState, action: TUserActions): TInitialState => {
  switch (action.type) {
    
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      }
    }

    case FORGOT_PASSWORD_REQUEST : {
      return {
        ...state, 
        forgotPasswordRequest: true,
      }
    }
    case FORGOT_PASSWORD_SUCCESS : {
      return {
        ...state, 
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
      }
    }
    case FORGOT_PASSWORD_FAILED : {
      return {
        ...state, 
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      }
    }

    case CREATE_USER_REQUEST: {
      return {
        ...state,
        createUserRequest: true,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        createUserRequest: false,
        createUserFailed: false,
        createUserSuccess: true,
      };
    }
    case CREATE_USER_FAILED: {
      return {
        ...state,
        createUserFailed: true,
        createUserRequest: false,
      };
    }

    case UPDATE_USER: {
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        createUserSuccess: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuth: false,
        logoutRequest: false,
        logoutFailed: false,
        logoutSuccess: true,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: { ...state.user, email: "", name: "", password: "" },
      };
    }

    default: 
    return state;
  }
}