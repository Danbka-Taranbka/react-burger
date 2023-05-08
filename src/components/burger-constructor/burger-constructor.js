import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { Button, CurrencyIcon, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/config.js";

function IngredientRender (ingredient) {
  return (
    <li className={styles.listItem} key={ingredient._id}>
      <DragIcon type="primary"/>
      <ConstructorElement thumbnail={ingredient.image} text={`${ingredient.name}`} price={ingredient.price} extraClass={styles.con}/>
    </li>
  );
}

function BurgerConstructor ({data, confirmOrder}) {

  const findTotal = (bun, ingredients) => {
    let sum = bun.price * 2;
    const total = ingredients.reduce((accumulator, current) => accumulator + current.price,
      sum);
    return total;
  }

  const bun = data.find(item => item.type === 'bun');
  const ingredients = data.filter(item => item.type !== 'bun');
  return (
    <div className={`mt-20 ml-10 pt-5 ${styles.constructor}`}>
      <li className={`mr-2 ${styles.listItem}`} key={'bun-top'}>
        <ConstructorElement thumbnail={bun.image} text={`${bun.name} (верх)`} price={bun.price} isLocked={true} type="top"/>
      </li>
      <ul className={`custom-scroll ${styles.list}`}>
        {ingredients.map(element => IngredientRender(element))}
      </ul>
      <li className={`mr-2 ${styles.listItem}`} key={'bun-bottom'}>
        <ConstructorElement thumbnail={bun.image} text={`${bun.name} (низ)`} price={bun.price} isLocked={true} type="bottom"/>
        </li>
      <div className={`${styles.info} mr-4`}>
        <p className="text text_type_digits-medium mr-2">{findTotal(bun, ingredients)}</p>
        <CurrencyIcon type="primary"/>
        <Button htmlType="button" type="primary" size="small" extraClass="p-10 pt-5 pb-5 ml-10 text text_type_main-small" onClick={confirmOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default BurgerConstructor;