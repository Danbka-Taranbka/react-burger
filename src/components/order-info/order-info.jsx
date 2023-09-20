import styles from "./order-info.module.css";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";


export const OrderInfo = ({order}) => {  

  return (
    <>
   {order && ( <div className={`${styles.box} mt-15`}>
      <p className="text text_type_digits-default">{`#${order.number}`}</p>
      <div className={styles.info}>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        <p className={`${styles.status} text text_type_main-default mt-3 mb-15`}>
          {order.status === "done" ? "Выполнен" : "В процессе"}
        </p>
        <div className={styles.ingredients}>
          <h2 className="text text_type_main-medium">Состав:</h2>
          <ul className={`${styles.list} custom-scroll`}>
            {order.ingredients.map((ingredient, index) => {
              return (
                <li key={index} className={`${styles.list__item} pl-3`}>
                  <IngredientIcon
                ingredient={ingredient}
                amount={order.ingredients.length - 5}
                index={index}
                />
                  <p className={`text text_type_main-default ${styles.name}`}>
                    {ingredient.name}
                  </p>
                  <p className={`text text_type_digits-default ${styles.price}`}>
                    {ingredient.counter} X {ingredient.price} <CurrencyIcon type="primary" />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
        </p>
        <div className={styles.total}>
          <p className="text text_type_digits-default">{order.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>)}
    </>
  )
}