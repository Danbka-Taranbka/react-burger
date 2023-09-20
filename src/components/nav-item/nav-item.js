import React from "react";
import styles from "./nav-item.module.css";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";


function NavItem (props) {
  return (
    <li className={styles.navItem}>
      <NavLink 
      to={props.path}
      className={styles.link}
style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
      >
        {({isActive}) => (
          <>
          {<props.element type={isActive ? "primary" : "secondary"}/>}
          <p className="text text_type_main-default">{props.text}</p>
          </>
        )}
      </NavLink>
    </li>
  )
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NavItem;