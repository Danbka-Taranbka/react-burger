 import { getCookie, handleTokens } from "../utils/utils";
 
 class Api  {
  constructor () {
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";

    this.forgotPasswordEndPoint = "password-reset";
    this.resetPasswordEndPoint = "password-reset/reset";
    
    this.createUserEndPoint = "auth/register"
    this.loginEndPoint = "auth/login";
    this.logoutEndPoint = "auth/logout";

    this.userEndPoint = "auth/user";

    this.updateTokenEndPoint = "auth/token";
  }

  async checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(await res.json());
  };

  getData (endPoint, options) {
    return fetch(`${this.baseUrl}/${endPoint}`, options).then(this.checkResponse);
  }
  
  fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this.checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.updateToken();
        if (!refreshData.success) {
          Promise.reject(refreshData);
        }
        handleTokens(refreshData);
        options.headers.Authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await this.checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getIngredientsList = () => {
    return this.getData(this.ingredientsEndPoint);
  };

  getOrderId = (ingredientsList) => {
    return this.getData(this.orderEndPoint, {
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

  updateToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return this.getData(this.updateTokenEndPoint, {
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

  getUserInfo = () => {
    return this.fetchWithRefresh(`${this.baseUrl}/${this.userEndPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    }).catch((err) => {
      console.log("err:", err);
    });
  };

  updateUserInfo = ({ name, email, password }) => {
    return this.fetchWithRefresh(`${this.baseUrl}/${this.userEndPoint}`, {
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

  forgotPassword = (email) => {
    return this.getData(this.forgotPasswordEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  resetPassword = (newPassword, token) => {
    return this.getData(this.resetPasswordEndPoint, {
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

  createUser = ({ email, password, name }) => {
    return this.getData(this.createUserEndPoint, {
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

  loginUser = ({ email, password }) => {
    return this.getData(this.loginEndPoint, {
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

  logoutUser = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return this.getData(this.logoutEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  };
}

export default Api;