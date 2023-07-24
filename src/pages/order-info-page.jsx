import { OrderInfo } from "../components/order-info/order-info"
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { wsUserConnectionStart, wsUserDisconnect } from "../services/actions/ws";
import { parseOrderIngredients } from "../utils/utils";

export const OrderInfoPage = ({wsRoute}) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const orders = useSelector(wsRoute);
  const data = useSelector((store) => store.ingredients.data)

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