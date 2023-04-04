import React from "react";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from "../../utils/data";

class App extends React.Component {
  render() {
    return(
      <div className={appStyles.app}>
      <AppHeader />
      <BurgerIngredients data={data}/>
      </div>
    )
  } 
}

export default App;