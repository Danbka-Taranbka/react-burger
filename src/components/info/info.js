import React from "react";
import styles from "./info.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

class Info extends React.Component {
  render() {
    return (
    <div className={`${styles.info}`}>
      <p className="text text_type_digits-medium mr-2">{this.props.price}</p>
      <CurrencyIcon type="primary"/>
      <Button htmlType="button" type="primary" size="small" extraClass="p-10 pt-5 pb-5 ml-10">
        Оформить заказ
      </Button>
    </div>
  )}
}

export default Info;