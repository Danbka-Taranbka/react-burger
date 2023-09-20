import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from "react-router-dom";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader () {
  return (
    <header className={`m-10 ${styles.appHeader}`}>
      <nav className={`${styles.nav} ${styles.nav_left}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"/"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Конструктор</p>
                </>
              )}
            </NavLink>
          </li>
          <li className={`${styles.list__item} pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"/feed"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Лента заказов</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Logo/>
      <nav className={`${styles.nav} ${styles.nav_right}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"/profile"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Личный кабинет</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;