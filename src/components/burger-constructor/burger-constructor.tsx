import { useEffect, useCallback } from 'react';
import styles from "./burger-constructor.module.css";
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_TOTAL_PRICE, addItemThunk, setBunActionThunk } from '../../services/actions/constructor';
import { UPDATE_CONSTRUCTOR_EMPTINESS, createOrderThunk } from '../../services/actions/order';
import { useDrop } from "react-dnd/dist/hooks";
import {ConstructorItem} from "../constructor-item/constructor-item";
import { useNavigate } from 'react-router-dom';

import { TItemId, TConstructorIngredient } from '../../services/types/data';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { RootState } from '../../services/types';


function BurgerConstructor () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalPrice = useAppSelector((store: RootState) => store.ingredients.totalPrice);
  const chosenBun = useAppSelector((store: RootState) => store.ingredients.chosenBun);
  const ingredientsList = useAppSelector(
    (store: RootState) => store.ingredients.constructorIngredients
  );
  const orderRequest = useAppSelector(
    (store: RootState) => store.order.orderRequest
  );

  const changeBun = (id: string) => {
    dispatch(setBunActionThunk(id));
  }

  const addIngredient = (id: string) => {
    dispatch(addItemThunk(id));
  };

  const confirmOrder = useCallback(() =>{
    if (localStorage.getItem("isAuth") && chosenBun) {
      const orderList = [
        chosenBun._id,
        ...ingredientsList.map((ingredient) => {
          return ingredient._id;
        }),
        chosenBun._id
      ];
      console.log(orderList)
      dispatch(createOrderThunk(orderList));
    } else {
      navigate("/login");
    }
  }, [ingredientsList, chosenBun, dispatch, navigate])

  useEffect(() => {
    if (
      ingredientsList.length === 0 && chosenBun
    ) {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: true });
    } else {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: false });
    }
  }, [ingredientsList, chosenBun, dispatch]);

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun" ],
    drop(itemId: TItemId) {
      if (itemId.type === "ingredient") {
        addIngredient(itemId._id);
      } else if (itemId.type === "bun" && chosenBun && ( itemId._id !== chosenBun._id || !chosenBun)) {
        changeBun(itemId._id);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_PRICE });
  }, [chosenBun, ingredientsList, dispatch]);

  return (
    <div  className={`mt-20 ml-10 pt-5 ${styles.constructor}`}>
      <div ref={dropTarget}>
      {(ingredientsList.length !== 0) || (chosenBun)  ? (
      <>
        {chosenBun && 
          <li className={`mr-2 mb-4 ${styles.listItem}`} key={'bun-top'}>
            <ConstructorElement thumbnail={chosenBun.image} text={`${chosenBun.name} (верх)`} price={chosenBun.price} isLocked={true} type="top"/>
          </li>}
          <ul className={`custom-scroll ${styles.list}`}>
            {ingredientsList.map((ingredient: TConstructorIngredient, index: number) => {
              console.log(ingredient)
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
        {chosenBun && 
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