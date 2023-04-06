import React from "react";
import styles from "./nav-item.module.css";

class NavItem extends React.Component {
  render() {
    return (
      <li className={styles.navItem}>
        <a href={this.props.link} className={`${styles.text} ${this.props.text}`}>
          {this.props.children}
        </a>
      </li>
    )
  }
}

export default NavItem;