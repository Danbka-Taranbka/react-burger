import styles from "./profile-orders.module.css";
import { OrderItem } from "../profile-orders-item/profile-orders-item";

export const ProfileOrders = () => {
  return (
    <div className={`${styles.feed} custom-scroll`}>
      <OrderItem id={12345} date={'02.02.2002'} name={'qwerty'} status={'done'} price={123}/>
    </div>
  )
}