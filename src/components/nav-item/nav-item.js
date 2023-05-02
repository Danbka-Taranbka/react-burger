import React from "react";
import styles from "./nav-item.module.css";
import PropTypes from 'prop-types';


function NavItem (props) {
  return (
    <li className={styles.navItem}>
      <a href={props.link} className={`${styles.link}`}>
        <div className={styles.text}>
          {props.icon}
          <p className={`${props.text}`}>{props.children}</p>
        </div>
      </a>
    </li>
  )
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NavItem;