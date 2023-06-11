import Api from "../../api/api";
import { v4 as uuidv4 } from "uuid";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS = "UPDATE_CONSTRUCTOR_EMPTINESS";

export const SET_INGREDIENT = "SET_INGREDIENT";
export const CLEAR_INGREDIENT = "CLEAR_INGREDIENT";

export const SET_BUN = "SET_BUN";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";

export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";
export const UPDATE_BUN_COUNTER = "UPDATE_BUN_COUNTER";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

export const SORT_DRAGGING_ITEM = "SORT_DRAGGING_ITEM";

export const TOGGLE_INGREDIENT_MODAL = "TOGGLE_INGREDIENT_MODAL";
export const TOGGLE_ORDER_MODAL = "TOGGLE_ORDER_MODAL";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS = "RESET_COUNTERS";

const api = new Api();

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_REQUEST,
    });
    api
      .getIngredientsList()
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

export function createOrder(ingredientsList) {
  return function (dispatch) {
    if (ingredientsList.length === 0) {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: true });
      return;
    }
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    api
      .getOrderId(ingredientsList)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
        dispatch({
          type: TOGGLE_ORDER_MODAL,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

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

export const openIngredientAction = (ingredient) => {
  return (dispatch) => {
    dispatch({ type: SET_INGREDIENT, payload: ingredient });
    dispatch({ type: TOGGLE_INGREDIENT_MODAL });
  };
};

export const closeIngredientAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_INGREDIENT_MODAL });
    dispatch({ type: CLEAR_INGREDIENT });
  };
};

export const closeOrderAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ORDER_MODAL });
    dispatch({ type: CLEAR_CONSTRUCTOR });
    dispatch({ type: RESET_COUNTERS });
  };
};

export const changeBunAction = (itemId) => {
  return (dispatch) => {
    dispatch({ type: SET_BUN, itemId });
    dispatch({ type: UPDATE_BUN_COUNTER, itemId });
  };
};