import { TOrder } from "../../services/types/data";
import styles from "./order-feed-stats.module.css";
import {useMemo, FC} from "react";

export type TStats = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const OrderFeedStats: FC<TStats> = ({orders, total, totalToday}) => {

  const done = useMemo(() => {
    return orders
    ? orders
        .filter((order) => order.status === "done")
        .map((order) => order.number)
        .slice(0, 10)
    : null;
  }, [orders])

  const pending = useMemo(() => {
    return orders
    ? orders
        .filter((order) => order.status === "pending")
        .map((order) => order.number)
        .slice(0, 10)
    : null;
  }, [orders])

  return (
    <div className={styles.stats}>
      <div className={styles.statuses}>
        <div className={styles.status}>
          <h3 className={`${styles.title} text text_type_main-medium mb-4`}>Готовы:</h3>
          {done && 
            done.map(item => {return (<p className={`${styles.order__number} text text_type_digits-default`} key={item}>{item}</p>)})
          }
        </div>
        <div className={styles.status}>
          <h3 className={`${styles.title} text text_type_main-medium mb-4`}>В работе:</h3>
          {pending && 
            pending.map(item => {return (<p className={`${styles.order__number} text text_type_digits-default`} key={item}>{item}</p>)})
          }
        </div>
      </div>
      <div>
        <h3 className={`${styles.title} text text_type_main-medium mb-4`}>Выполнено за всё время:</h3>
        <p className={`${styles.amount} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <h3 className={`${styles.title} text text_type_main-medium mb-4`}>Выполнено за сегодня:</h3>
        <p className={`${styles.amount} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  )
}