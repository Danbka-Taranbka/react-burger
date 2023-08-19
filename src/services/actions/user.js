import { forgotPass, resetPass, newUser, getUser, updateUser, login, logout } from "../../api/api";
import { deleteCookie, handleTokens } from "../../utils/utils";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const IS_AUTH = "isAuth";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const CLEAR_USER = "CLEAR_USER";

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
      forgotPass(email)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        localStorage.setItem("resetInProgress", true)
      })
      .catch((e) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

export function resetPassword(newPassword, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
      resetPass(newPassword, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
          localStorage.removeItem("resetPasswordSent");
        }
        return res;
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function createUser(form) {
  return function (dispatch) {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
      newUser(form)
      .then((res) => {
        dispatch({
          type: CREATE_USER_SUCCESS,
        });
        return res;
      })
      .catch((e) => {
        dispatch({
          type: CREATE_USER_FAILED,
        });
      });
  };
}

export function getUserInfo() {
  return function (dispatch) {
      getUser()
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.user,
        });
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };
}

export function updateUserInfo(userNewInfo) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
      updateUser(userNewInfo)
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.user,
        });
        dispatch({
          type: UPDATE_USER_SUCCESS,
        });
      })
      .catch((e) => {
        console.log("error:", e);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}

export function loginUser(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
      login(form)
      .then((res) => {
        handleTokens(res);
        localStorage.setItem(IS_AUTH, true);
        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
          });
          dispatch({
            type: UPDATE_USER,
            payload: res.user,
          });
        }
        return res;
      })
      .catch((e) => {
        console.log(e.message);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
      logout()
      .then((res) => {
        if (res.success) {
          dispatch({
            type: CLEAR_USER,
          });
          deleteCookie("token");
          localStorage.removeItem(IS_AUTH);
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
        console.log(e.message);
      });
  };
}