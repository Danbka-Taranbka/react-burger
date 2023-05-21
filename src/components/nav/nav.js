import React from "react";
import styles from "./nav.module.css";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../nav-item/nav-item.js";


function Nav () {
  return (
    <nav className={styles.nav}>
      <NavItem link='#' text={`text text_type_main-default`} icon={<BurgerIcon type="primary"/>}>Конструктор</NavItem>
      <NavItem link='#' text={`text text_type_main-default text_color_inactive`} icon={<ListIcon type="secondary"/>}>Лента заказов</NavItem>
      <NavItem link='#' text={`text text_type_main-default text_color_inactive`} icon={<ProfileIcon type="secondary"/>}>Личный кабинет</NavItem>
    </nav>
  )
}

export default Nav;