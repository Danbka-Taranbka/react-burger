import { OrderInfo } from "../components/order-info/order-info"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { wsFeedConnectionStart, wsFeedConnectionClosed } from "../services/actions/ws";
import { parseOrderIngredients } from "../utils/utils";

export const OrderInfoFeedPage = ({wsRoute}) => {
  const { id } = useParams();

  const [currentOrder, setCurrentOrder] = useState();

  const dispatch = useDispatch();

  const orders = useSelector(wsRoute);
  const data = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setCurrentOrder(
        orders.orders.find((order) => {
          return order._id === id;
        })
      );
    }
  }, [orders, id]);

    return (<>
        {currentOrder && orders && (<OrderInfo order={parseOrderIngredients(data, currentOrder)}/>)}
        </>
 )
}