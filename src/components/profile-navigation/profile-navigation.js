import { NavLink } from "react-router-dom"
import styles from './profile-navigation.module.css';

export const ProfileNavigation = () => {
  return (
    <div className={`${styles.profile__menu} mr-15 mt-30`}>
    <NavLink
      to={"/profile"}
      className={`${styles.link} ${styles.profile__link} text text_type_main-medium`}
      style={({ isActive }) => ({
      color: isActive ? "#f2f2f3" : "#8585ad",
      })}
    >
      Профиль
    </NavLink>

    <NavLink
      to={"/orders"}
      className={`${styles.link} ${styles.profile__link} text text_type_main-medium`}
      style={({ isActive }) => ({
      color: isActive ? "#f2f2f3" : "#8585ad",
      })}
    >
      История заказов
    </NavLink>

    <NavLink
      to={"/"}
      className={`${styles.link} ${styles.profile__link} text text_type_main-medium`}
      style={({ isActive }) => ({
      color: isActive ? "#f2f2f3" : "#8585ad",
      })}
    >
      Выход
    </NavLink>
    <p className={`${styles.profile__text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете <br/> изменить свои персональные данные
    </p>
    </div>
  )
}