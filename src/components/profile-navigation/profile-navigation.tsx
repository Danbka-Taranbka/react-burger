import { NavLink } from "react-router-dom"
import styles from './profile-navigation.module.css';
import { logoutUserThunk } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";

export const ProfileNavigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUserThunk(() => {
      navigate("/");
    })
    );
  } 
  return (
    <div className={`${styles.profile__menu} mr-15 mt-30`}>
    <NavLink
      to={"/profile"}
      end
      className={`${styles.profile__link} text text_type_main-medium`}
      style={({ isActive }) => ({
      color: isActive ? "#f2f2f3" : "#8585ad",
      })}
    >
      Профиль
    </NavLink>

    <NavLink
      to={"/profile/orders"}
      className={`${styles.profile__link} text text_type_main-medium`}
      style={({ isActive }) => ({
      color: isActive ? "#f2f2f3" : "#8585ad",
      })}
    >
      История заказов
    </NavLink>

    <p
      className={`${styles.profile__link} text text_type_main-medium`}
      onClick={logout}
    >
      Выход
    </p>
    <p className={`${styles.profile__text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете <br/> изменить свои персональные данные
    </p>
    </div>
  )
}