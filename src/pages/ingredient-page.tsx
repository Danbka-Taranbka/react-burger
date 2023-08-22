import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/modal/modal";
import { useAppSelector } from "../hooks/hooks";

export const IngredientPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = useAppSelector((store) => store.ingredients.data);

  const currentIngredient = data.find((item) => {
    return item._id === id;
  });

  const closeIngredient = useCallback(() => {
    localStorage.setItem("ingredientModal", "false");
    localStorage.removeItem("currentIngredient");
    navigate(-1);
  }, [navigate])

  return (

       currentIngredient && (
        <Modal onClose={closeIngredient}>
        <IngredientDetails data={currentIngredient}/>
        </Modal>
      )

  )
}