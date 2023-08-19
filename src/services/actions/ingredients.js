import { getIngredientsList } from "../../api/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_REQUEST,
    });
      getIngredientsList()
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENT_SUCCESS,
          data,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENT_FAILED,
        });
      });
  };
}