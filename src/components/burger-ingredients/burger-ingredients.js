import React from 'react';
import styles from './burger-ingredients.module.css';
import IngredientsBlock from '../ingredients-block/ingredients-block.js';
import TabMenu from '../tabs/tabs';

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={styles.burgerIngredients}>
        <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
        <TabMenu/>
        <ul className={` ${styles.list}`}>
          <li ><IngredientsBlock title='Булки' data={this.props.data} type='bun'/></li>
          <li><IngredientsBlock title='Соусы' data={this.props.data} type='sauce'/></li>
          <li><IngredientsBlock title='Начинки' data={this.props.data} type='main'/></li>
        </ul>
      </div>
    )
  }
}

export default BurgerIngredients;