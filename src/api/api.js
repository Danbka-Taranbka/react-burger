 class Api  {
  constructor () {
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";
    this.forgotPasswordEndPoint = "password-reset";
    this.resetPasswordEndPoint = "password-reset/reset";
    this.createUserEndPoint = "auth/register"
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getData (endPoint, options) {
    return fetch(`${this.baseUrl}/${endPoint}`, options).then(this.checkResponse);
  }

  getIngredientsList = () => {
    return this.getData(this.ingredientsEndPoint);
  };

  getOrderId = (ingredientsList) => {
    return this.getData(this.orderEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
      }),
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

  createUser = (email, password, name) => {
    return this.getData(this.createUserEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      }),
    })
  }
}

export default Api;