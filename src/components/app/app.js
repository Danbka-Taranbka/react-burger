import { useEffect, useState, useContext } from "react";
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Api from "../../api/api";
import Modal from "../modal/modal";
import OrderDetails from "../../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientsContext} from "../../utils/ingredientsContext.js";

const api = new Api();

function App () {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const constructorState = useState([]
  );

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
    <IngredientsContext.Provider value={constructorState}>
   {state.data.length && <><BurgerIngredients data={state.data} openIngredient={openIngredient}/>
   <BurgerConstructor confirmOrder={openOrderDetails}/></>}
   </IngredientsContext.Provider>
    {isOpenIngredientModal && <Modal onClose={handleCloseIngredientModal}><IngredientDetails data={ingredient}/></Modal>}
    {isOpenOrderModal && <Modal onClose={handleCloseOrderModal}><OrderDetails orderId={'034536'}/></Modal>}
    </div>
  )
}

export default App;