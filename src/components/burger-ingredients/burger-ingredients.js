import React from 'react';
import burgIngredsStyles from './burger-ingredients.module.css';
import IngredientsBlock from './ingredients-block/ingredients-block.js';

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={burgIngredsStyles.burgerIngredients}>
        <h2 className={burgIngredsStyles.header}>Соберите бургер</h2>
        <IngredientsBlock header='Булки' data={this.props.data} type='bun'/>
        <IngredientsBlock header='Соусы' data={this.props.data} type='sauce'/>
        <IngredientsBlock header='Начинки' data={this.props.data} type='main'/>
      </div>
    )
  }
}

export default BurgerIngredients;