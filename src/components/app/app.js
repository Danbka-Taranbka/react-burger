import { useEffect, useState, useReducer } from "react";
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Api from "../../api/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details.js";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientsContext} from "../../utils/ingredientsContext.js";
import {ConstructorContext} from "../../utils/constructorContext.js";

const api = new Api();

const initialConstructorState = {
  constructorData: [],
  totalPrice: 0
}

function constructorReducer (constructorState, action) {
  switch (action.type) {
    case "add": 
      //Добавляем новый ингредиент в конструктор
      return {constructorData: [...constructorState.constructorData, action.newIngredient],
        //Прибавляем цену нового ингредиента к общей стоимости
        totalPrice: constructorState.totalPrice + action.isBun(action.newIngredient)};
    case "remove": 
      //Здесь будет реализовано удаление ингредиента и вычитание его цены из общей стоимости
      return console.log('Ingredient has been removed');
    default: 
      throw new Error(`Wrong type of action: ${action}`)
  }
}

function App () {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [constructorState, dispatchConstructorState] = useReducer(constructorReducer, initialConstructorState);

  const [orderId, setOrderId] = useState(0);
  const [isOpenIngredientModal, setIngredientModal] = useState(false);
  const [isOpenOrderModal, setOrderModal] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    setState({...state, isLoading: true, hasError: false});
    api
    .getIngredientsList()
    .then(( {data} ) => setState({...state, data, isLoading: false }))
    .catch ((e) => {
      setState({...state, hasError: true, isLoading: true})
    });
  }, []);

  const confirmOrder = () => {
    setState({...state, isLoading: true, hasError: false});
    const orderList = constructorState.constructorData.map((ingredient) => {
        return ingredient._id;
      })
    api
      .getOrderId(orderList)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setOrderId(res.order.number);
        setState({...state, isLoading: false, hasError: false});
      })
      .then(() => {
        openOrderDetails();
      })
      .catch ((e) => {
        setState({...state, hasError: true, isLoading: true})
      });
  };

  //Работа с модальными окнами
  const handleCloseIngredientModal = () => {
    setIngredientModal(false);
  };

  const handleCloseOrderModal = () => {
    setOrderModal(false);
  };

  const openIngredient = (ingred) => {
    setIngredient(ingred);
    setIngredientModal(true);
  };

  const openOrderDetails = () => {
    setOrderModal(true);
  };

  return(
    <div className={`${appStyles.app}`}>
      <AppHeader />
      <IngredientsContext.Provider value={[state.data]}>
        <ConstructorContext.Provider value={[constructorState, dispatchConstructorState]}>
          {state.data.length > 0 && 
          <><BurgerIngredients openIngredient={openIngredient}/>
          <BurgerConstructor confirmOrder={confirmOrder}/></>}
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    {isOpenIngredientModal && <Modal onClose={handleCloseIngredientModal}><IngredientDetails data={ingredient}/></Modal>}
    {isOpenOrderModal && <Modal onClose={handleCloseOrderModal}><OrderDetails orderId={orderId}/></Modal>}
    </div>
  )
}

export default App;