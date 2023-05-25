 class Api  {
  constructor () {
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";
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

}

export default Api;