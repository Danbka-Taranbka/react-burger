export const SET_INGREDIENT = "SET_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";
export const TOGGLE_INGREDIENT_MODAL = "TOGGLE_INGREDIENT_MODAL";

export const setCurrentIngredientAction = (ingredient) => ({
  type: SET_INGREDIENT, 
  payload: ingredient
})

export const toggleIngredientInfoAction = () => ({
 type: TOGGLE_INGREDIENT_MODAL
})

export const openIngredientInfoAction = (item) => {
  return (dispatch) => {
    localStorage.setItem("ingredientModal", true);
    localStorage.setItem('currentIngredient', JSON.stringify(item));
  }
}

export const closeIngredientInfoAction = (item) => {
  return (dispatch) => {
    localStorage.setItem('ingredientModal', false);
    localStorage.removeItem('currentIngredient', JSON.stringify(item));
  }
}

export const clearCurrentIngredientAction = () => ({
  type: CLEAR_INGREDIENT
})

/*export const openIngredientAction = (ingredient) => {
  return (dispatch) => {
    dispatch({ type: SET_INGREDIENT, payload: ingredient });
    dispatch({ type: TOGGLE_INGREDIENT_MODAL });
  };
};*/

/*export const closeIngredientAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_INGREDIENT_MODAL });
    dispatch({ type: CLEAR_INGREDIENT });
  };
};*/