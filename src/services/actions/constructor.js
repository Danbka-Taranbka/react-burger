import { v4 as uuidv4 } from "uuid";
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";
export const SET_BUN = "SET_BUN";
export const UPDATE_BUN_COUNTER = "UPDATE_BUN_COUNTER";

export const addIngredientAction = (ingredientId) => {
  const uuid = uuidv4();
  return (dispatch) => {
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, ingredientId, uuid });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, ingredientId });
  };
};

export const removeIngredientAction = (ingredientId, uniqueId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, uniqueId });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, ingredientId });
  };
};

export const changeBunAction = (itemId) => {
  return (dispatch) => {
    dispatch({ type: SET_BUN, itemId });
    dispatch({ type: UPDATE_BUN_COUNTER, itemId });
  };
};