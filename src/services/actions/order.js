import Api from "../../api/api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS = "UPDATE_CONSTRUCTOR_EMPTINESS";
export const TOGGLE_ORDER_MODAL = "TOGGLE_ORDER_MODAL";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS = "RESET_COUNTERS";

const api = new Api();

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


export const toggleOrderInfoAction = () => ({
  type: TOGGLE_ORDER_MODAL
})

export const clearConstructorAction = () => ({
  type: CLEAR_CONSTRUCTOR
})

export const resetCountersAction = () => ({
  type: RESET_COUNTERS
})

/*export const closeOrderAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ORDER_MODAL });
    dispatch({ type: CLEAR_CONSTRUCTOR });
    dispatch({ type: RESET_COUNTERS });
  };
};*/