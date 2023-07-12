import { useEffect, useCallback } from "react";
import appStyles from './app.module.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProtectedRouteElement } from "../protected-route";

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details.js";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients, 
  toggleOrderInfoAction,
  clearConstructorAction,
  resetCountersAction} from '../../services/actions/index.js';
import {setCurrentIngredientAction, 
  toggleIngredientInfoAction, 
  clearCurrentIngredientAction, 
} from '../../services/actions/index.js';

import { RegistrationPage } from "../../pages/registration-page";
import { LoginPage } from "../../pages/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page";
import MainPage from "../../pages/main-page";
import { HeaderPage } from "../../pages/header-page";
import { ProfilePage } from "../../pages/profile-page";
import { ProfileForm } from "../profile-form/profile-form";
import { ProfileOrders } from "../profile-orders/profile-orders";
import { IngredientPage } from "../../pages/ingredient-page";

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
    dispatch(setCurrentIngredientAction(item));
    dispatch(toggleIngredientInfoAction());
    
  }, []);

  const closeIngredient = useCallback(() => {
    dispatch(toggleIngredientInfoAction());
    dispatch(clearCurrentIngredientAction());
  }, []);

  const closeOrder = useCallback(() => {
    dispatch(toggleOrderInfoAction());
    dispatch(clearConstructorAction());
    dispatch(resetCountersAction());
  }, []);

  return (
    <div className={appStyles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderPage/>}>
            <Route path="/ingredients/:id" element={<IngredientPage/>}/>
            <Route path="/register" element={<ProtectedRouteElement element={<RegistrationPage />} auth={true}/>}/>
            <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} auth={true}/>}/>
            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} auth={true}/>}/>
            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} auth={true}/>}/>
            <Route path="/" element={<MainPage openIngredient={openIngredient} closeOrder={closeOrder} closeIngredient={closeIngredient}/>}/>
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>}>
              <Route index element={<ProfileForm/>}/>
              <Route path="orders" element={<ProfileOrders/>}/>
            </Route>
            <Route path="/profile/orders"/>
            <Route path="/profile/orders/:id"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

  /*return(
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
  )*/
}

export default App;