import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category.js';
import TabMenu from '../tab-menu/tab-menu';
import {ingredientPropTypes} from "../../utils/config.js";


function BurgerIngredients (props) {
  return (
    <div className={styles.burgerIngredients}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
      <TabMenu/>
      <ul className={`custom-scroll ${styles.list}`}>
        <li><IngredientsCategory title='Булки' data={props.data} type='bun'/></li>
        <li><IngredientsCategory title='Соусы' data={props.data} type='sauce'/></li>
        <li><IngredientsCategory title='Начинки' data={props.data} type='main'/></li>
      </ul>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default BurgerIngredients;