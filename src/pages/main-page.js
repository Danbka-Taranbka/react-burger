import styles from './pages.module.css';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';

export default function MainPage({openIngredient, closeIngredient, closeOrder}) {
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