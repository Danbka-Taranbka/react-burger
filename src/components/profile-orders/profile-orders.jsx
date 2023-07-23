import styles from "./profile-orders.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { wsUserConnectionStart, wsUserConnectionClosed } from "../../services/actions/ws.js"; 
import { parseOrderIngredients } from "../../utils/utils";


export const ProfileOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const orders = useSelector((store) => store.wsUser.orders);
  
  return (
    <div className={`${styles.feed} custom-scroll`}>
      {orders
        .slice(0)
        .reverse()
        .map((order) => {
          return (<OrderItem order={parseOrderIngredients(data, order)} key={order._id} location={"profileOrders"}/>)
        })
      }
    </div>
  )
}