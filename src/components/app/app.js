import { useEffect, useCallback } from "react";
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details.js";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients, openIngredientAction, closeIngredientAction, closeOrderAction} from '../../services/actions/index.js'

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );

  const orderSuccess = useSelector(
    (store) => store.order.orderSuccess
  );

  const ingredientModal = useSelector(
    (store) => store.ingredientPopup.ingredientModal
  );

  const orderModal = useSelector(
    (store) => store.order.orderModal
  );

  const openIngredient = useCallback((item) => {
    dispatch(openIngredientAction(item));
  }, []);

  const closeIngredient = useCallback(() => {
    dispatch(closeIngredientAction());
  }, []);

  const closeOrder = useCallback(() => {
    dispatch(closeOrderAction());
  }, []);

  return(
    <div className={`${appStyles.app}`}>
      <AppHeader />
      {dataRequest && ('Loading...')}
      {dataFailed && ('Error:(')}
      {!dataRequest && !dataFailed && data.length && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openIngredient={openIngredient}/>
          <BurgerConstructor/>
        </DndProvider>
      )}


    {ingredientModal && (
    <Modal onClose={closeIngredient}>
      <IngredientDetails data={currentIngredient}/>
    </Modal>
    )}
    {orderModal && orderSuccess && (
    <Modal onClose={closeOrder}>
      <OrderDetails/>
    </Modal>
    )}
    </div>
  )
}

export default App;