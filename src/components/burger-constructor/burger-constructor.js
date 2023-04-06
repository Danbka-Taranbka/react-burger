import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import Info from "../info/info.js";


const data = {
  top: {"type": "top",
  "isLocked": true,
  "text": "Краторная булка N-201i (верх)",
  "price": 200,
  "thumbnail": "img"}
}

class BurgerConstructor extends React.Component {

  findTotal() {
    
  }

  render() {
    return (
      <div className={`mt-20 p-5 pl-4 pr-4 ${styles.constructor}`}>
        <ConstructorElement {...data.top}/>
        <ConstructorElement {...data.top} type={"bottom"}/>
        <Info price={300}/>
      </div>
    )
  }
}

export default BurgerConstructor;