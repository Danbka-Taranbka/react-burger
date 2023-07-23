import styles from "./order-feed.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";
import { parseOrderIngredients } from "../../utils/utils";


export const OrderFeed = ({ordersList, data, location}) => {
  return (
    <div className={`${styles.order__feed} custom-scroll`}>
      {ordersList
        .slice(0)
        .reverse()
        .map((order) => {
          return (<OrderItem order={parseOrderIngredients(data, order)} key={order._id} location={location}/>)
        })
      }
    </div>
  )
}