import styles from './burger-ingredients.module.css';
import { IngredientsCategory } from '../ingredients-category/ingredients-category';
import { TabMenu } from '../tab-menu/tab-menu';
import {useRef, useState, FC} from 'react'
import { TIngredient } from '../../services/types/data';

type TBurgerIngredients = {
  openIngredient: (ingredient: TIngredient) => void;
}

export const BurgerIngredients: FC<TBurgerIngredients> = ({openIngredient}) => {
  const [current, setCurrent] = useState('buns');

  const bunsRef = useRef<HTMLLIElement>(null);
  const saucesRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);
  const tabs = {bunsRef, saucesRef, mainRef};
  const tabRefs = useRef<HTMLUListElement>(null);

  const updatePosition = () => {
    const tabsPositionY = Math.floor(tabRefs.current!.getBoundingClientRect().y);
    const bunsPositionY = Math.floor(bunsRef.current!.getBoundingClientRect().y);
    const saucePositionY = Math.floor(saucesRef.current!.getBoundingClientRect().y);
    const mainPositionY = Math.floor(mainRef.current!.getBoundingClientRect().y);

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