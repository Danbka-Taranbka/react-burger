import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "../actions/user.js"

const initialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
};

export const userReducer = (state = initialState, action) => {
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

    default: 
    return state;
  }
}