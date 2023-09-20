import { TIngredient } from "../types/data";

export const SET_INGREDIENT: "SET_INGREDIENT" = "SET_INGREDIENT";
export const CLEAR_INGREDIENT: "CLEAR_INGREDIENT" = "CLEAR_INGREDIENT";
export const TOGGLE_INGREDIENT_MODAL: "TOGGLE_INGREDIENT_MODAL" = "TOGGLE_INGREDIENT_MODAL";

type TSetCurrentIngredientAction = {
  readonly type: typeof SET_INGREDIENT;
  readonly payload: TIngredient;
}

type TToggleIngredientInfoAction = {
  readonly type: typeof TOGGLE_INGREDIENT_MODAL;
}

type TClearCurrentIngredientAction = {
  readonly type: typeof CLEAR_INGREDIENT;
}

export type TPopupActions = 
| TSetCurrentIngredientAction
| TToggleIngredientInfoAction
| TClearCurrentIngredientAction;

export const setCurrentIngredientAction = (ingredient: TIngredient): TSetCurrentIngredientAction => ({
  type: SET_INGREDIENT, 
  payload: ingredient
})

export const toggleIngredientInfoAction = (): TToggleIngredientInfoAction => ({
 type: TOGGLE_INGREDIENT_MODAL
})

export const openIngredientInfoAction = (item: TIngredient) => {
    localStorage.setItem("ingredientModal", "true");
    localStorage.setItem('currentIngredient', JSON.stringify(item));
}

export const closeIngredientInfoAction = (item: TIngredient) => {
    localStorage.setItem('ingredientModal', "false");
    localStorage.removeItem('currentIngredient');

}

export const clearCurrentIngredientAction = () => ({
  type: CLEAR_INGREDIENT
})