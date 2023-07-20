import styles from "./profile-orders.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { wsUserConnectionStart, wsUserConnectionClosed } from "../../services/actions/ws.js"; 
import { getIngredients } from "../../services/actions";


export const ProfileOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);
  const orders = useSelector((store) => store.wsUser.orders);
  console.log(orders);
  return (
    <div className={`${styles.feed} custom-scroll`}>
      {orders.length>0 && !dataRequest && !dataFailed && data.length &&
      orders.map(order => {return (<OrderItem order={order} location={"profileOrders"}/>)})
      }
    </div>
  )
}