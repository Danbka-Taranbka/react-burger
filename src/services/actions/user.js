import Api from "../../api/api";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_REQUEST";
export const CREATE_USER_FAILED = "CREATE_USER_REQUEST";

const api = new Api();

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    return api
      .forgotPassword(email)
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
    return api
      .resetPassword(newPassword, token)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        localStorage.removeItem("resetInProgress")
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function createUser(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    return api
      .createUser(email, password, name)
      .then(() => {
        dispatch({
          type: CREATE_USER_SUCCESS,
        });
      })
      .catch((e) => {
        dispatch({
          type: CREATE_USER_FAILED,
        });
      });
  };
}