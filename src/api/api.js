 class Api  {

  getData = async (url) => {
    const res = await fetch(url);
    
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getIngredientsList = () => {
    return this.getData("https://norma.nomoreparties.space/api/ingredients");
  };
}

export default Api;