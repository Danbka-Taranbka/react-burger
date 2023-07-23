import { OrderInfo } from "../components/order-info/order-info"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { wsFeedConnectionStart, wsFeedConnectionClosed } from "../services/actions/ws";
import { parseOrderIngredients } from "../utils/utils";

export const OrderInfoFeedPage = ({wsRoute}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentOrder, setCurrentOrder] = useState(null);

  const orders = useSelector(wsRoute);
  const data = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.orders) {
      setCurrentOrder(
        orders.orders.find((item) => {
          return item.number === Number(id);
      })
      ) 
    }
  }, [orders, id])

  console.log(currentOrder)

    return (<>
        {orders && id && currentOrder && data.length && (<OrderInfo order={parseOrderIngredients(data, currentOrder)}/>)}
        </>
 )
}