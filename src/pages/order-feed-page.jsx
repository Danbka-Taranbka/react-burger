import styles from "./pages.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderFeed } from "../components/order-feed/order-feed";
import { OrderFeedStats } from "../components/order-feed-stats/order-feed-stats";
import { wsFeedConnectionStart, wsFeedDisconnect } from "../services/actions/ws";


export const OrderFeedPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.ingredients.data);
  const { orders, total, totalToday } = useSelector((store) => store.wsFeed.orders);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <div>
      <h1 className={`${styles.order__feed__title} text text_type_main-large mb-5`} onClick={() => {console.log(orders);}}>Лента заказов</h1>
      <div className={styles.main}>
        {orders && data && <OrderFeed ordersList={orders} data={data}/>}
        {orders && totalToday && total && <OrderFeedStats total={total} totalToday={totalToday} orders={orders}/>}
      </div>
    </div>
  )
}