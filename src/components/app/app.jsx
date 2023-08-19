import { useEffect } from "react";
import appStyles from './app.module.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRouteElement } from "../protected-route";
import { useDispatch } from "react-redux";
import { getIngredients } from '../../services/actions/index.js';
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
import { OrderFeedPage } from "../../pages/order-feed-page";
import { OrderInfoPage } from "../../pages/order-info-page";
import { OrderInfoFeedPage } from "../../pages/order-info-feed-page";

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
              <Route path="orders" element={<ProtectedRouteElement element={<ProfileOrders />}/>}/>
            </Route>
            <Route path="profile/orders/:id" element={<ProtectedRouteElement element={<OrderInfoPage wsRoute={(store) => store.wsUser.orders}/>}/>}/>
            <Route path="/feed" element={<OrderFeedPage/>}/>
            <Route path="feed/:id" element={<OrderInfoFeedPage wsRoute={(store) => store.wsFeed.orders}/>}/>
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