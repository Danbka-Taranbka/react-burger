import styles from './pages.module.css';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/modal/modal';
import {useEffect, useCallback} from "react";
import { getIngredients } from '../services/actions';
import { openIngredientInfoAction, toggleIngredientInfoAction } from '../services/actions/ingredientPopup';
import { toggleOrderInfoAction, clearConstructorAction, resetCountersAction } from '../services/actions';

export default function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  const orderSuccess = useSelector(
    (store) => store.order.orderSuccess
  );

  const orderModal = useSelector(
    (store) => store.order.orderModal
  );
  

  const openIngredient = useCallback(
    (item) => {
      dispatch(openIngredientInfoAction(item));
      dispatch(toggleIngredientInfoAction());
    },
    [dispatch]
  );

  const closeOrder = useCallback(() => {
    dispatch(toggleOrderInfoAction());
    dispatch(clearConstructorAction());
    dispatch(resetCountersAction());
  }, [dispatch]);

  return(
    <div className={`${styles.main}`}>
      {dataRequest && ('Loading...')}
      {dataFailed && ('Error:(')}
      {!dataRequest && !dataFailed && data.length && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openIngredient={openIngredient}/>
          <BurgerConstructor/>
        </DndProvider>
      )}
    {orderModal && orderSuccess && (
    <Modal onClose={closeOrder}>
      <OrderDetails/>
    </Modal>
    )}
    </div>
  )
}