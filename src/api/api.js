import React from "react";

export default class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredients = "ingredients";
  }

  getData = async (url) => {
    const res = await fetch(url);
    
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getIngredientsList = () => {
    return this.getData(`${this.baseUrl}/${this.ingredients}`);
  };
}