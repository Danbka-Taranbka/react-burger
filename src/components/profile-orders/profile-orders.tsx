import styles from "./profile-orders.module.css";
import { OrderItem } from "../order-feed-item/order-feed-item";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { wsUserConnectionStart, wsUserDisconnect } from "../../services/actions/ws"; 
import { parseOrderIngredients } from "../../utils/utils";
import { useAppSelector } from "../../hooks/hooks";


export const ProfileOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserDisconnect());
    };
  }, [dispatch]);

  const data = useAppSelector((store) => store.ingredients.data);
  const orders = useAppSelector((store) => store.wsUser.orders);
  console.log(orders)
  return (<>
    {orders && data && (
    <div className={`${styles.feed} custom-scroll`}>
      {orders
        .slice(0)
        .reverse()
        .map((order) => {
          return (<OrderItem order={parseOrderIngredients(data, order)} key={order._id} location={"profileOrders"}/>)
        })
      }
    </div>)}
    </>
  )
}