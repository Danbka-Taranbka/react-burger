import React from 'react';
import burgIngredsStyles from './burger-ingredients.module.css';
import Buns from './ingredients-block/ingredients-categories/buns.js';
import Sauces from './ingredients-block/ingredients-categories/souces.js';

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={burgIngredsStyles.burgerIngredients}>
        <h2 className={burgIngredsStyles.header}>Соберите бургер</h2>
        <Buns />
        <Sauces />
      </div>
    )
  }
}

export default BurgerIngredients;