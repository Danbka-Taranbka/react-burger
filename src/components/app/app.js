import React from "react";
import appStyles from './app.module.css';
import data from "../../utils/data.js";
import {constructorData} from "../../utils/data.js";
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App () {
  return(
    <div className={`${appStyles.app}`}>
    <AppHeader />

    <BurgerIngredients data={data}/>
    <BurgerConstructor data={constructorData}/>
    </div>
  )
}

export default App;