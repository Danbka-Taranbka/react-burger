import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../services/actions";

export const IngredientPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector((store) => store.ingredients.data);

  const currentIngredient = data.find((item) => {
    return item._id === id;
  });

  //const currentIngredient = JSON.parse(localStorage.getItem("currentIngredient"));

//  const ingredientModal = JSON.parse(
//    localStorage.getItem("ingredientModal")
//  )

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