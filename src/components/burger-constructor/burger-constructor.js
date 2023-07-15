import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder,    
  addConstructorItemAction, 
  updateIngredientCounterAction,
  setBunItemAction,
  updateBunCounterAction
} from '../../services/actions/index.js';
import { UPDATE_TOTAL_PRICE } from '../../services/actions/index.js';
import { UPDATE_CONSTRUCTOR_EMPTINESS } from '../../services/actions/order.js';
import { useDrop } from "react-dnd/dist/hooks";
import {ConstructorItem} from "../constructor-item/constructor-item.js";
import { useNavigate } from 'react-router-dom';


function BurgerConstructor () {
  const navigate = useNavigate();
   
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.ingredients.totalPrice);
  const chosenBun = useSelector((store) => store.ingredients.chosenBun);
  const ingredientsList = useSelector(
    (store) => store.ingredients.constructorIngredients
  );
  const orderRequest = useSelector(
    (store) => store.order.orderRequest
  );

  const changeBun = (bun) => {
    dispatch(setBunItemAction(bun._id));
    dispatch(updateBunCounterAction(bun._id));
  }

  const addIngredient = (ingredient) => {
    const uuid = uuidv4();
    dispatch(addConstructorItemAction(ingredient._id, uuid));
    dispatch(updateIngredientCounterAction(ingredient._id));
  };

  const confirmOrder = useCallback(() =>{
    if (localStorage.getItem("isAuth") && chosenBun) {
      const orderList = [
        ingredientsList.map((ingredient) => {
          return ingredient._id;
        }),
        Object.keys(chosenBun).length === 0 ? [] : chosenBun._id,
      ].flatMap((i) => i);
      dispatch(createOrder(orderList));
    } else {
      navigate("/login");
    }
  }, [ingredientsList, chosenBun, dispatch, navigate])

  useEffect(() => {
    if (
      ingredientsList.length === 0 &&
      Object.keys(chosenBun).length === 0
    ) {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: true });
    } else {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: false });
    }
  }, [ingredientsList, chosenBun]);

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun" ],
    drop(itemId) {
      if (itemId.type === "ingredient") {
        addIngredient(itemId);
      } else if (itemId.type === "bun" &&( itemId !== chosenBun || Object.keys(chosenBun).length === 0)) {
        changeBun(itemId);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_PRICE });
  }, [chosenBun, ingredientsList]);

  return (
    <div  className={`mt-20 ml-10 pt-5 ${styles.constructor}`}>
      <div ref={dropTarget}>
      {(ingredientsList.length !== 0) || (Object.keys(chosenBun).length !== 0)  ? (
      <>
        {Object.keys(chosenBun).length !== 0 && 
          <li className={`mr-2 mb-4 ${styles.listItem}`} key={'bun-top'}>
            <ConstructorElement thumbnail={chosenBun.image} text={`${chosenBun.name} (верх)`} price={chosenBun.price} isLocked={true} type="top"/>
          </li>}
          <ul className={`custom-scroll ${styles.list}`}>
            {ingredientsList.map((ingredient, index) => {
              return (
                <ConstructorItem
                key={ingredient.uniqueId}
                ingredient={ingredient}
                type="ingredient"
                index={index}
                />
              )
            })}
          </ul>
        {Object.keys(chosenBun).length !== 0  && 
          <li className={`mr-2 mt-4 ${styles.listItem}`} key={'bun-bottom'}>
            <ConstructorElement thumbnail={chosenBun.image} text={`${chosenBun.name} (низ)`} price={chosenBun.price} isLocked={true} type="bottom"/>
          </li>}
      </>
      ) : (
        <div className={`${styles.emptyContainer}`}>
          <h2 className={`text text_type_main-default ${styles.text}`}>Перетащите ингредиент сюда</h2>
        </div>)
      }
      </div>
      <div className={`${styles.info} mr-4`}>
        {<p className="text text_type_digits-medium mr-2">{totalPrice}</p>}
        <CurrencyIcon type="primary"/>
        <Button htmlType="button" type="primary" size="small" extraClass="p-10 pt-5 pb-5 ml-10 text text_type_main-small" onClick={() => {confirmOrder()}}>
          {orderRequest ? 'Загрузка...' : 'Оформить заказ'}
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;