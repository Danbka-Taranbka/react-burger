import React from "react";
import styles from "./nav-item.module.css";
import PropTypes from 'prop-types';

class NavItem extends React.Component {
  render() {
    return (
      <li className={styles.navItem}>
        <a href={this.props.link} className={`${styles.link}`}>
          <div className={styles.text}>
            {this.props.icon}
            <p className={`${this.props.text}`}>{this.props.children}</p>
          </div>
        </a>
      </li>
    )
  }
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NavItem;