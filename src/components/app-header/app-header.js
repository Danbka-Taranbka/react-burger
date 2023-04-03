import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class MenuItem extends React.Component {
  render() {
    return (
      <div className={headerStyles.menuItem}>
        {this.props.icon}
        <a href={this.props.link} className={this.props.condition}>{this.props.text}</a>
      </div>
    )
  }
}

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.appHeader}>
        <MenuItem icon={<BurgerIcon type="primary"/>} link={'#'} text="Конструктор" condition={headerStyles.linkActive}/>
        <MenuItem icon={<ListIcon type="secondary"/>} link={'#'} text="Лента заказов" condition={headerStyles.link}/>
        <Logo />
        <MenuItem icon={<ProfileIcon type="secondary"/>} link={'#'} text="Личный кабинет" condition={headerStyles.link}/>
      </header>
    )
  }
}

export default AppHeader;