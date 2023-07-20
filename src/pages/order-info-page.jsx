import { OrderInfo } from "../components/order-info/order-info"
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { wsUserConnectionStart, wsUserConnectionClosed } from "../services/actions/ws";
import { getIngredients } from "../services/actions";

export const OrderInfoPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const orders = useSelector((store) => store.wsUser.orders.orders);

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  const currentOrder = orders.find((item) => {
    return item._id === id;
  });

    return (
        <OrderInfo order={currentOrder}/>
 )
}