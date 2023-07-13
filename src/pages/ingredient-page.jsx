import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { getIngredients } from "../services/actions";
import {useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/modal";
import { closeIngredientInfoAction } from "../services/actions/ingredientPopup";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentIngredient = JSON.parse(
    localStorage.getItem("currentIngredient")
  );

  const ingredientModal = JSON.parse(
    localStorage.getItem("ingredientModal")
  )

  const closeIngredient = useCallback(() => {
    dispatch(closeIngredientInfoAction())
    navigate(-1);
  }, [dispatch, navigate])

  return (

      ingredientModal && (
        <Modal onClose={closeIngredient}>
        <IngredientDetails data={currentIngredient}/>
        </Modal>
      )

  )
}