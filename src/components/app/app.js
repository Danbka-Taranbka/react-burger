import { useEffect, useCallback } from "react";
import appStyles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
    let location = useLocation();
    let background = location.state && location.state.background

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
        <Routes location={background || location}>
          <Route path="/" element={<HeaderPage/>}>
            <Route path="/ingredients/:id" element={<IngredientPage/>}/>
            <Route path="/register" element={<ProtectedRouteElement element={<RegistrationPage />} auth={true}/>}/>
            <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} auth={true}/>}/>
            <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} auth={true}/>}/>
            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} auth={true}/>}/>
            <Route path="/" index element={<MainPage />}/>
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>}>
              <Route index element={<ProfileForm/>}/>
              <Route path="orders" element={<ProfileOrders/>}/>
            </Route>
            <Route path="/profile/orders"/>
            <Route path="/profile/orders/:id"/>
          </Route>
        </Routes>

{ background &&
          (<Routes>
            <Route path="/ingredients/:id" element={<IngredientPage/>}/>
          </Routes>)}

    </div>
  )
}

export default App;