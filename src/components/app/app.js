import { useEffect, useState } from "react";
import appStyles from './app.module.css';

import {constructorData} from "../../utils/data.js";
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Api from "../../api/api";
import Modal from "../modal/modal";
import OrderDetails from "../../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

const api = new Api();

function App () {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [isOpen, setOpen] = useState(false);
  const [ingredient, setIngredient] = useState(null);
  const [kind, setKind] = useState(null);

  useEffect(() => {
    setState({...state, isLoading: true, hasError: false});
    api
    .getIngredientsList()
    .then(( {data} ) => setState({...state, data, isLoading: false }))
    .catch ((e) => {
      setState({...state, hasError: true, isLoading: true})
    });
  }, []);

  const togglePopup = () => {
    setOpen(!isOpen);
  };

  const openIngredient = (ingred) => {
    setIngredient(ingred);
    setKind('ingredient');
    togglePopup();
  };

  const openOrderDetails = () => {
    setKind('order');
    togglePopup();
  };

  return(
    <div className={`${appStyles.app}`}>
    <AppHeader />
   {state.data.length && <BurgerIngredients data={state.data} openIngredient={openIngredient}/>}
    {state.data.length && <BurgerConstructor data={state.data} openIngredient={openIngredient} confirmOrder={openOrderDetails}/>}
    {isOpen && (
      <Modal onClose={togglePopup}>
      {(kind === 'order') ? (<OrderDetails orderId={'034536'}/>):
        (<IngredientDetails data={ingredient}/>)}
      </Modal>
    )}
    </div>
  )
}

export default App;