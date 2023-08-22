import { getCookie, handleTokens } from "../utils/utils";

const baseUrl = "https://norma.nomoreparties.space/api";
const ingredientsEndPoint = "ingredients";
const orderEndPoint = "orders";

const forgotPasswordEndPoint = "password-reset";
const resetPasswordEndPoint = "password-reset/reset";
 
const createUserEndPoint = "auth/register"
const loginEndPoint = "auth/login";
const logoutEndPoint = "auth/logout";
const userEndPoint = "auth/user";

const updateTokenEndPoint = "auth/token";

type TOptions = {
  method: string;
  headers: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
  body?: string;
}

export type TUserInfo = {
  name?: string;
  email: string;
  password: string;
};


export const checkResponse = async (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(await res.json());
};

export const getData = (endPoint: string, options?: TOptions) => {
    return fetch(`${baseUrl}/${endPoint}`, options).then(checkResponse);
}
  
export const fetchWithRefresh = async (url: string, options: TOptions) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await updateToken();
        if (!refreshData.success) {
          Promise.reject(refreshData);
        }
        handleTokens(refreshData);
        options.headers.Authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
};

export const getIngredientsList = () => {
    return getData(ingredientsEndPoint);
};

export const getOrderId = (ingredientsList: string[]) => {
    return getData(orderEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
      }),
    }).catch((err) => {
      console.log("err:", err);
    });
};

export const updateToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return getData(updateTokenEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }).catch((err) => {
      console.log("err:", err);
    });
};

export const getUser = () => {
    return fetchWithRefresh(`${baseUrl}/${userEndPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    }).catch((err) => {
      console.log("err:", err);
    });
};

export const updateUser = ({ name, email, password }: TUserInfo) => {
    return fetchWithRefresh(`${baseUrl}/${userEndPoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).catch((err) => {
      console.log("err:", err);
    });
};

export const forgotPass = (email: string) => {
    return getData(forgotPasswordEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
      }),
    });
}

export const resetPass = (newPassword: string, token: string) => {
    return getData(resetPasswordEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: newPassword,
        token: token
      }),
    });
}

export const newUser = ({ email, password, name }: TUserInfo) => {
    return getData(createUserEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
};

export const login = ({ email, password }: TUserInfo) => {
    return getData(loginEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
};

export const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return getData(logoutEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
};