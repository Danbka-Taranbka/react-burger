import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category.js';
import TabMenu from '../tab-menu/tab-menu';
import {ingredientPropTypes} from "../../utils/config.js";


function BurgerIngredients ({data, openIngredient}) {
  return (
    <div className={styles.burgerIngredients}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
      <TabMenu/>
      <ul className={`custom-scroll ${styles.list}`}>
        <li><IngredientsCategory title='Булки' data={data} type='bun' openIngredient={openIngredient}/></li>
        <li><IngredientsCategory title='Соусы' data={data} type='sauce' openIngredient={openIngredient}/></li>
        <li><IngredientsCategory title='Начинки' data={data} type='main' openIngredient={openIngredient}/></li>
      </ul>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default BurgerIngredients;