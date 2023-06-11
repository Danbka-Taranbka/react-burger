import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category.js';
import TabMenu from '../tab-menu/tab-menu';
import {useRef, useState} from 'react'


function BurgerIngredients ({openIngredient}) {
  const [current, setCurrent] = useState('buns');

  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();
  const tabs = {bunsRef, saucesRef, mainRef};
  const tabRefs = useRef();

  const updatePosition = () => {
    const tabsPositionY = Math.floor(tabRefs.current.getBoundingClientRect().y);
    const bunsPositionY = Math.floor(bunsRef.current.getBoundingClientRect().y);
    const saucePositionY = Math.floor(saucesRef.current.getBoundingClientRect().y);
    const mainPositionY = Math.floor(mainRef.current.getBoundingClientRect().y);

    const bunsDistance = Math.abs(tabsPositionY - bunsPositionY);
    const sauceDistance = Math.abs(tabsPositionY - saucePositionY);
    const mainDistance = Math.abs(tabsPositionY - mainPositionY);

    if (bunsDistance < sauceDistance && bunsDistance < mainDistance) {
      setCurrent("buns");
    } else if (sauceDistance < bunsDistance && sauceDistance < mainDistance) {
      setCurrent("sauces");
    } else if (mainDistance < bunsDistance && mainDistance < sauceDistance) {
      setCurrent("main");
    }
  };

  return (
    <div className={styles.burgerIngredients}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
      <TabMenu refs={tabs} current={current} setCurrent={setCurrent}/>
      <ul ref={tabRefs} onScroll={updatePosition} className={`custom-scroll ${styles.list}`}>
        <li ref={bunsRef}><IngredientsCategory title='Булки' type='bun' openIngredient={openIngredient} dragType={'bun'}/></li>
        <li ref={saucesRef}><IngredientsCategory title='Соусы' type='sauce' openIngredient={openIngredient} dragType={'ingredient'}/></li>
        <li ref={mainRef}><IngredientsCategory title='Начинки' type='main' openIngredient={openIngredient} dragType={'ingredient'}/></li>
      </ul>
    </div>
  )
}

BurgerIngredients.propTypes = {
  openIngredient: PropTypes.func.isRequired,
}

export default BurgerIngredients;