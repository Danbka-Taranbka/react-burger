import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-menu.module.css";
import { FC } from "react";

export type TTabMenu = {
  current: "buns" | "sauces" | "main";
  refs: {};
  setCurrent: Function;
}

export const TabMenu: FC<TTabMenu> = ({refs, setCurrent, current}) => {
  
  const onTabClick = (ref) => {
    const elmnt = ref;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
    });
  };
    return(
      <div className={`mt-5 ${styles.tabMenu}`}>
        <Tab value="buns" active={current === 'buns'} onClick={() => {
          setCurrent('buns');
          onTabClick(refs.bunsRef);
        }}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={() => {
          setCurrent('sauces');
          onTabClick(refs.saucesRef);
        }}> Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={() => {
          setCurrent('main');
          onTabClick(refs.mainRef);
        }}>Начинки</Tab>
      </div>
    )
  }