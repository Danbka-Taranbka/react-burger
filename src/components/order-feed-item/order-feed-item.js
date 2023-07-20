import styles from "./order-feed-item.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { useSelector } from "react-redux";

export const OrderItem = ({ order, extraClass, location}) => {
  console.log(order)
  const orderIngredients = order.ingredients.slice(0, 6);
  const data = useSelector(store => store.ingredients.data);
 
  const totalPrice = order.ingredients.reduce(function (total, currentId) {
    const currentIngredient = data.find(item => item._id === currentId);
    return (currentIngredient.type === "bun"
      ? total + currentIngredient.price*2
      : total + currentIngredient.price)
  }, 0);

  const onOrderClick = () => {
    console.log(order);
  }

  return (
    <Link className={`${styles.order__item} ${extraClass}`} onClick={onOrderClick}
    to={order._id} >
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
                ingredientId={ingredient}
                amount={order.ingredients.length - 5}
                index={index}
                location={location}
                />
              </li>
            )
          })}
        </ul>
        <p className={`${styles.order__price} text text_type_digits-default`}>{totalPrice} <CurrencyIcon/></p>
      </div>
    </Link>
  )
}