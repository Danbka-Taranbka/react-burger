import { forgotPass, resetPass, newUser, getUser, updateUser, login, logout, TUserInfo } from "../../api/api";
import { deleteCookie, handleTokens } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export const IS_AUTH: "isAuth" = "isAuth";

export const UPDATE_USER: "UPDATE_USER" = "UPDATE_USER";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export const CREATE_USER_REQUEST: "CREATE_USER_REQUEST" = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS" = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: "CREATE_USER_FAILED" = "CREATE_USER_FAILED";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";

type TIsAuth = {
  readonly type: typeof IS_AUTH;
};

type TUpdateUser = {
  readonly type: typeof UPDATE_USER;
  readonly user: TUserInfo;
};

type TUpdateUserRequest = {
  readonly type: typeof UPDATE_USER_REQUEST;
};
type TUpdateUserSuccess = {
  readonly type: typeof UPDATE_USER_SUCCESS;
};
type TUpdateUserFailed = {
  readonly type: typeof UPDATE_USER_FAILED;
};
type TForgotPasswordRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};
type TForgotPasswordSuccess = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};
type TForgotPasswordFailed = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
};
type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};
type TResetPasswordFailed = {
  readonly type: typeof RESET_PASSWORD_FAILED;
};
type TRegisterRequest = {
  readonly type: typeof CREATE_USER_REQUEST;
};
type TRegisterSuccess = {
  readonly type: typeof CREATE_USER_SUCCESS;
};
type TRegisterFailed = {
  readonly type: typeof CREATE_USER_FAILED;
};
type TLoginRequest = {
  readonly type: typeof LOGIN_REQUEST;
};
type TLoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS;
};
type TLoginFailed = {
  readonly type: typeof LOGIN_FAILED;
};
type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};
type TLogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS;
};
type TLogoutFailed = {
  readonly type: typeof LOGOUT_FAILED;
};
type TClearUser = {
  readonly type: typeof CLEAR_USER;
};

export type TUserActions =
  | TIsAuth
  | TUpdateUser
  | TUpdateUserRequest
  | TUpdateUserSuccess
  | TUpdateUserFailed
  | TForgotPasswordRequest
  | TForgotPasswordSuccess
  | TForgotPasswordFailed
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordFailed
  | TRegisterRequest
  | TRegisterSuccess
  | TRegisterFailed
  | TLoginRequest
  | TLoginSuccess
  | TLoginFailed
  | TLogoutRequest
  | TLogoutSuccess
  | TLogoutFailed
  | TClearUser;

  export const IsUserAuthedAction = (): TIsAuth => ({
    type: IS_AUTH,
  });

  export const UpdateUserAction = (user: TUserInfo): TUpdateUser => ({
    type: UPDATE_USER,
    user,
  });

  export const UpdateUserRequestAction = (): TUpdateUserRequest => ({
    type: UPDATE_USER_REQUEST,
  });

  export const UpdateUserSuccessAction = (): TUpdateUserSuccess => ({
    type: UPDATE_USER_SUCCESS,
  });
 
  export const UpdateUserFailedAction = (): TUpdateUserFailed => ({
    type: UPDATE_USER_FAILED,
  });
  
  export const ForgotPasswordRequestAction = (): TForgotPasswordRequest => ({
      type: FORGOT_PASSWORD_REQUEST,
    });
  
  export const ForgotPasswordSuccessAction = (): TForgotPasswordSuccess => ({
      type: FORGOT_PASSWORD_SUCCESS,
    });
 
  export const ForgotPasswordFailedAction = (): TForgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED,
  });
  
  export const ResetPasswordRequestAction = (): TResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST,
  });
  
  export const ResetPasswordSuccessAction = (): TResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
  });
 
  export const ResetPasswordFailedAction = (): TResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED,
  });
  
  export const RegisterRequestAction = (): TRegisterRequest => ({
    type: CREATE_USER_REQUEST,
  });
  
  export const RegisterSuccessAction = (): TRegisterSuccess => ({
    type: CREATE_USER_SUCCESS,
  });
  
  export const RegisterFailedAction = (): TRegisterFailed => ({
    type: CREATE_USER_FAILED,
  });
  
  export const LoginRequestAction = (): TLoginRequest => ({
    type: LOGIN_REQUEST,
  });
 
  export const LoginSuccessAction = (): TLoginSuccess => ({
    type: LOGIN_SUCCESS,
  });
 
  export const LoginFailedAction = (): TLoginFailed => ({
    type: LOGIN_FAILED,
  });
  
  export const LogoutRequestAction = (): TLogoutRequest => ({
    type: LOGOUT_REQUEST,
  });
  
  export const LogoutSuccessAction = (): TLogoutSuccess => ({
    type: LOGOUT_SUCCESS,
  });
  
  export const LogoutFailedAction = (): TLogoutFailed => ({
    type: LOGOUT_FAILED,
  });
  
  export const ClearUserAction = (): TClearUser => ({
    type: CLEAR_USER,
  });

export const forgotPasswordThunk: AppThunk = (
  email: string,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(ForgotPasswordRequestAction());
    return forgotPass(email)
      .then(() => {
        dispatch(ForgotPasswordSuccessAction());
        localStorage.setItem("resetInProgress", "true");
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(ForgotPasswordFailedAction());
      });
  };
};

export const resetPasswordThunk: AppThunk = (
  { password, code }: { password: string; code: string },
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(ResetPasswordRequestAction());
    return resetPass(password, code)
      .then((res) => {
        if (res.success) {
          dispatch(ResetPasswordSuccessAction());
          localStorage.removeItem("resetInProgress");
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(ResetPasswordFailedAction());
      });
  };
};

export const createUserThunk: AppThunk = (
  form: TUserInfo,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(RegisterRequestAction());
    return newUser(form)
      .then((res) => {
        if (res.success) {
          dispatch(RegisterSuccessAction());
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(RegisterFailedAction());
      });
  };
};

export const getUserInfoThunk: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    return getUser()
      .then((res) => {
        dispatch(UpdateUserAction(res.user));
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };
};

export const updateUserInfoThunk: AppThunk = (userNewInfo: TUserInfo) => {
  return function (dispatch: AppDispatch) {
    dispatch(UpdateUserRequestAction());
    return updateUser(userNewInfo)
      .then((res) => {
        dispatch(UpdateUserAction(res.user));
        dispatch(UpdateUserSuccessAction());
      })
      .catch((e) => {
        console.log("error:", e);
        dispatch(UpdateUserFailedAction());
      });
  };
};

export const loginUserThunk: AppThunk = (
  form: TUserInfo,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(LoginRequestAction());
    return login(form)
      .then((res) => {
        handleTokens(res);
        localStorage.setItem(IS_AUTH, "true");
        if (res.success) {
          dispatch(LoginSuccessAction());
          dispatch(UpdateUserAction(res.user));
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(LoginFailedAction());
      });
  };
};

export const logoutUserThunk: AppThunk = (onSucces: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(LogoutRequestAction());
    return logout()
      .then((res) => {
        if (res.success) {
          dispatch(ClearUserAction());
          deleteCookie("token");
          localStorage.removeItem(IS_AUTH);
          localStorage.removeItem("refreshToken");
          dispatch(LogoutSuccessAction());
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(LogoutFailedAction());
        console.log(e.message);
      });
  };
};