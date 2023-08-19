import styles from "./order-feed-item.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { useSelector } from "react-redux";
import { FC } from "react";
import { TUpdatedOrder } from "../../utils/utils";

type TOrderItem = {
  order: TUpdatedOrder;
  location?: "profileOrders";
};

export const OrderItem: FC<TOrderItem> = ({ order, location}) => {

  const orderIngredients = order.ingredients.slice(0, 6);
  const data = useSelector(store => store.ingredients.data);
  
  return (<>
    {orderIngredients && data.length>0 && order.ingredients.length>0 && (<Link className={`${styles.order__item}`}
    to={location==="profileOrders"
    ? order._id
    : `${order.number}`} >
      <div className={`${styles.order__box}`}>
        <p className={`text text_type_digits-default`}>{`#${order.number}`}</p>
        <p className={`text text_type_digits-default text_color_inactive`}>
          <FormattedDate date={new Date(order.createdAt)}/>
        </p>
      </div>
      <p className={`text text_type_main-large`}>{order.name}</p>
      {location === "profileOrders" && order.status === "done" && (
          <p className={`text text_type_main-default ${styles.done}`}>
            Выполнен
          </p>
        )}
      {location === "profileOrders" && order.status !== "done" && (
          <p className="text text_type_main-default">
            {order.status === "pending"
              ? "Готовится"
              : order.status === "created"
              ? "Создан"
              : "Неизвестный статус"}
          </p>
        )}
      <div className={`${styles.order__box}`}>
        <ul className={`${styles.order__ingredients}`}>
          {orderIngredients.map((ingredient, index) => {
            return (
              <li key={index} className={styles.order__icon}>
                <IngredientIcon
                ingredient={ingredient}
                amount={order.ingredients.length - 5}
                index={index}
                location={location}
                />
              </li>
            )
          })}
        </ul>
       <p className={`${styles.order__price} text text_type_digits-default`}>{order.totalPrice}<CurrencyIcon type="primary"/></p>
      </div>
    </Link>)}
    </>
  )
}