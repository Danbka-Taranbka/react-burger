import { getIngredientsList } from "../../api/api";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../types/data";

export const GET_INGREDIENT_REQUEST: "GET_INGREDIENT_REQUEST" = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS: "GET_INGREDIENT_SUCCESS" = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED: "GET_INGREDIENT_FAILED" = "GET_INGREDIENT_FAILED";

type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENT_REQUEST;
};

type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENT_SUCCESS;
  data: TIngredient[];
};

type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENT_FAILED;
};

export type TIngredientsActions = 
| TGetIngredientsRequest
| TGetIngredientsSuccess
| TGetIngredientsFailed;

export const getIngredientsRequest = (): TGetIngredientsRequest => ({
  type: GET_INGREDIENT_REQUEST,
})

export const getIngredientsSuccess = (data: TIngredient[]): TGetIngredientsSuccess => ({
  type: GET_INGREDIENT_SUCCESS,
  data,
})

export const getIngredientsFailed = (): TGetIngredientsFailed => ({
  type: GET_INGREDIENT_FAILED,
})

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
      return getIngredientsList()
      .then(({ data }) => {
        dispatch(getIngredientsSuccess(data));
      })
      .catch((e) => {
        dispatch(getIngredientsFailed());
      });
  };
}