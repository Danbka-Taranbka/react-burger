import styles from "./order-feed.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";


export const OrderFeed = ({ordersList, location}) => {
  return (
    <div className={`${styles.order__feed} custom-scroll`}>
      {ordersList && (ordersList.map((order) => {return (<OrderItem order={order} key={order._id} location={location}/>)}))}
    </div>
  )
}