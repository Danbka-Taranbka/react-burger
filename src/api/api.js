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

  getData (url, options) {
    return fetch(url, options).then(this.checkResponse);
  }

  getIngredientsList = () => {
    return this.getData(`${this.baseUrl}/${this.ingredientsEndPoint}`);
  };

  getOrderId = (ingredientsList) => {
    return this.getData(`${this.baseUrl}/${this.orderEndPoint}`, {
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