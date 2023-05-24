import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category.js';
import TabMenu from '../tab-menu/tab-menu';


function BurgerIngredients ({openIngredient}) {
  return (
    <div className={styles.burgerIngredients}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
      <TabMenu/>
      <ul className={`custom-scroll ${styles.list}`}>
        <li><IngredientsCategory title='Булки' type='bun' openIngredient={openIngredient}/></li>
        <li><IngredientsCategory title='Соусы' type='sauce' openIngredient={openIngredient}/></li>
        <li><IngredientsCategory title='Начинки' type='main' openIngredient={openIngredient}/></li>
      </ul>
    </div>
  )
}

BurgerIngredients.propTypes = {
  openIngredient: PropTypes.func.isRequired,
}

export default BurgerIngredients;