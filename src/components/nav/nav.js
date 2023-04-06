import React from "react";
import styles from "./nav.module.css";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "../nav-item/nav-item.js";

class Nav extends React.Component {
  render() {
    return (
      <nav className={styles.nav}>
        <NavItem text={`text text_type_main-default`}><BurgerIcon type="primary"/>Конструктор</NavItem>
        <NavItem text={`text text_type_main-default text_color_inactive`}><ListIcon type="secondary"/>Лента заказов</NavItem>
        <NavItem text={`text text_type_main-default text_color_inactive`}><ProfileIcon type="secondary"/>Профиль</NavItem>
      </nav>
    )
  }
}

export default Nav;