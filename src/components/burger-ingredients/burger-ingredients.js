import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category.js';
import TabMenu from '../tabs/tabs';
import {ingredientPropTypes} from "../../utils/config.js";

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={styles.burgerIngredients}>
        <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
        <TabMenu/>
        <ul className={`custom-scroll ${styles.list}`}>
          <li><IngredientsCategory title='Булки' data={this.props.data} type='bun'/></li>
          <li><IngredientsCategory title='Соусы' data={this.props.data} type='sauce'/></li>
          <li><IngredientsCategory title='Начинки' data={this.props.data} type='main'/></li>
        </ul>
      </div>
    )
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default BurgerIngredients;