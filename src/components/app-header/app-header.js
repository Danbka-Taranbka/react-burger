import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
      <div className={headerStyles.appHeader}>
        <div className={headerStyles.menuPunct}>
          <BurgerIcon />
          <a href="#" className={headerStyles.linkActive}>Конструктор</a>
        </div>
        <div className={headerStyles.menuPunct}>
          <ListIcon />
          <a href="#" className={headerStyles.link}>Лента заказов</a>
        </div>
        <Logo />
        <div className={headerStyles.menuPunct}>
          <ProfileIcon />
          <a href="#" className={headerStyles.link}>Личный кабинет</a>  
        </div>
      </div>
    )
  }
}

export default AppHeader;