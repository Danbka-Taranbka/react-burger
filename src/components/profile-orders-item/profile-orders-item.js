import styles from "./profile-orders-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

export const OrderItem = ({id, date, name, status, ingredients, price}) => {
  const navigate = useNavigate();

  const onOrderClick = () => {
    navigate("/profile/orders/:id")
  }

  return (
    <li className={`${styles.order__item} p-6`} onClick={onOrderClick}>
      <div className={`${styles.order__box}`}>
        <p className={`text text_type_digits-default`}>{id}</p>
        <p className={`text text_type_digits-default text_color_inactive`}>{date}</p>
      </div>
      <p className={`text text_type_main-large`}>{name}</p>
      <p className={`text text_type_main-default`}>{status}</p>
      <div className={`${styles.order__box}`}>
        <div className={`${styles.order__ingredients}`}>
          {ingredients}
        </div>
        <p className={`${styles.order__price} text text_type_digits-default`}>{price} <CurrencyIcon/></p>
      </div>
    </li>
  )
}