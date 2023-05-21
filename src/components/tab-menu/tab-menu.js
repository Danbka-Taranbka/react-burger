import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-menu.module.css";

const TabMenu = () => {
  const [current, setCurrent] = React.useState('buns')
    return(
      <div className={`mt-5 ${styles.tabMenu}`}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}> Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </div>
    )
  }


export default TabMenu;