import { OrderInfo } from "../components/order-info/order-info"
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { wsUserConnectionStart, wsUserConnectionClosed } from "../services/actions/ws";
import { getIngredients } from "../services/actions";
import { parseOrderIngredients } from "../utils/utils";

export const OrderInfoFeedPage = ({wsRoute}) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const orders = useSelector(wsRoute);
  const data = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  const currentOrder = orders.orders.find((item) => {
    return item._id === id;
  })

    return (<>
        {currentOrder && orders && (<OrderInfo order={parseOrderIngredients(data, currentOrder)}/>)}
        </>
 )
}