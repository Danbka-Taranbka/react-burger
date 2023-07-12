import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions";
import {useEffect} from "react";

export const IngredientPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  return (
    <>
      {dataRequest && "Загрузка"}
      {dataFailed && "Произошла ошибка"}
      {!dataRequest && !dataFailed && data.length && (
        <IngredientDetails />
      )}
    </>
  )
}