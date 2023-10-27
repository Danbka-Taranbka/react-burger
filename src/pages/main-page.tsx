import styles from './pages.module.css';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OrderDetails }from '../components/order-details/order-details';
import {Modal} from '../components/modal/modal';
import { useCallback } from "react";
import { openIngredientInfoAction, toggleIngredientInfoAction } from '../services/actions/ingredientPopup';
import { toggleOrderInfoAction, clearConstructorAction, resetCountersAction } from '../services/actions';
import { TIngredient } from '../services/types/data';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

export default function MainPage() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((store) => store.ingredients.data);
  const dataRequest = useAppSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useAppSelector((store) => store.ingredients.dataFailed);

  const orderSuccess = useAppSelector(
    (store) => store.order.orderSuccess
  );

  const orderModal = useAppSelector(
    (store) => store.order.orderModal
  );

  const orderInfo = useAppSelector((store) => store.order.orderInfo) 

  const openIngredient = useCallback(
    (item: TIngredient) => {
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
    {orderModal && orderSuccess && orderInfo && (
    <Modal onClose={closeOrder}>
      <OrderDetails orderNumber={orderInfo.number}/>
    </Modal>
    )}
    </div>
  )
}