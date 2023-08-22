import { OrderInfo } from "../components/order-info/order-info"
import {  useParams } from "react-router-dom";
import { useEffect, FC } from "react";
import { wsUserConnectionStart, wsUserDisconnect } from "../services/actions/ws";
import { parseOrderIngredients } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export type TOrderInfoPage = {
  
}

export const OrderInfoPage: FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.wsUser.orders);
  const data = useAppSelector((store) => store.ingredients.data)

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserDisconnect());
    };
  }, [dispatch]);

  const currentOrder = orders.find((item) => {
    return item._id === id;
  })

    return (<>
        {currentOrder && orders && data && (<OrderInfo order={parseOrderIngredients(data, currentOrder)}/>)}
        </>
 )
}