import { OrderInfo } from "../components/order-info/order-info"
import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { wsFeedConnectionStart, wsFeedDisconnect } from "../services/actions/ws";
import { parseOrderIngredients } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const OrderInfoFeedPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [currentOrder, setCurrentOrder]: any = useState();

  const orders = useAppSelector((store) => store.wsFeed.orders);
  const data = useAppSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setCurrentOrder(
        orders.find((item) => {
          return item.number === Number(id);
      })
      ) 
    }
  }, [orders, id])

    return (<>
        {orders && id && currentOrder && data.length && (<OrderInfo order={parseOrderIngredients(data, currentOrder)}/>)}
        </>
 )
}