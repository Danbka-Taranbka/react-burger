import styles from "./order-feed.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";
import { parseOrderIngredients } from "../../utils/utils";
import { FC } from "react";
import { TOrder, TIngredient } from "../../services/types/data";

export type TOrderFeed = {
  ordersList: TOrder[];
  data: TIngredient[];
  location?: "profileOrders";
}

export const OrderFeed: FC<TOrderFeed> = ({ordersList, data, location}) => {
  return (<>
    {ordersList && 
    (<div className={`${styles.order__feed} custom-scroll`}>
      {ordersList
        .slice(0)
        .reverse()
        .map((order) => {
          return (<OrderItem order={parseOrderIngredients(data, order)} key={order._id} location={location}/>)
        })
      }
    </div>)}
    </>
  )
}