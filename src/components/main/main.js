import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";

class Main extends React.Component {
  render() {
    return (
      <div className={`${styles.main} pt-10 pb-10`}>
        <BurgerIngredients data={this.props.data}/>
        <BurgerConstructor/>
      </div>
    )
  }
}

export default Main;