import PropTypes from 'prop-types';
import { useContext } from 'react';
import styles from "./burger-constructor.module.css";
import { Button, CurrencyIcon, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/config.js";
import { IngredientsContext } from '../../utils/ingredientsContext';

function IngredientRender (ingredient) {
  return (
    <li className={styles.listItem} key={ingredient._id}>
      <DragIcon type="primary"/>
      <ConstructorElement thumbnail={ingredient.image} text={`${ingredient.name}`} price={ingredient.price} extraClass={styles.con}/>
    </li>
  );
}

function BurgerConstructor ({confirmOrder}) {
   
  const [constructorState] = useContext(IngredientsContext);



  const bun = constructorState.constructorData.find(item => item.type === 'bun');
  const ingredients = constructorState.constructorData.filter(item => item.type !== 'bun');
  return (
    <div className={`mt-20 ml-10 pt-5 ${styles.constructor}`}>
      {bun && <li className={`mr-2 ${styles.listItem}`} key={'bun-top'}>
        <ConstructorElement thumbnail={bun.image} text={`${bun.name} (верх)`} price={bun.price} isLocked={true} type="top"/>
      </li>}
      <ul className={`custom-scroll ${styles.list}`}>
        {ingredients.map(element => IngredientRender(element))}
      </ul>
      {bun && <li className={`mr-2 ${styles.listItem}`} key={'bun-bottom'}>
        <ConstructorElement thumbnail={bun.image} text={`${bun.name} (низ)`} price={bun.price} isLocked={true} type="bottom"/>
      </li>}
      <div className={`${styles.info} mr-4`}>
        {<p className="text text_type_digits-medium mr-2">{constructorState.totalPrice}</p>}
        <CurrencyIcon type="primary"/>
        <Button htmlType="button" type="primary" size="small" extraClass="p-10 pt-5 pb-5 ml-10 text text_type_main-small" onClick={confirmOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
}

export default BurgerConstructor;