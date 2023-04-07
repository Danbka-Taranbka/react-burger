import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Nav from '../nav/nav.js';



class AppHeader extends React.Component {
  render() {
    return (
      <header className={`m-10 ${styles.appHeader}`}>
        <Nav/>
        <Logo/>
      </header>
    )
  }
}

export default AppHeader;