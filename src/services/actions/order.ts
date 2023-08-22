import { getOrderId } from "../../api/api";
import { TUpdatedOrder } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS: "UPDATE_CONSTRUCTOR_EMPTINESS" = "UPDATE_CONSTRUCTOR_EMPTINESS";
export const TOGGLE_ORDER_MODAL: "TOGGLE_ORDER_MODAL" = "TOGGLE_ORDER_MODAL";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS: "RESET_COUNTERS" = "RESET_COUNTERS";

type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
}
type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly res: TUpdatedOrder;
}

type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
}

type TUpdateConstructorEmptinessAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR_EMPTINESS;
  state: boolean;
}

type TToggleOrderInfoAction = {
  readonly type: typeof TOGGLE_ORDER_MODAL;
}

type TClearConstructorAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

type TResetCountersAction = {
  readonly type: typeof RESET_COUNTERS;
}

export type TOrderActions = 
| TToggleOrderInfoAction
| TClearConstructorAction
| TResetCountersAction
| TGetOrderFailedAction
| TGetOrderRequestAction
| TGetOrderSuccessAction
| TUpdateConstructorEmptinessAction;

export const toggleOrderInfoAction = (): TToggleOrderInfoAction => ({
  type: TOGGLE_ORDER_MODAL
})

export const clearConstructorAction = (): TClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR
})

export const resetCountersAction = (): TResetCountersAction => ({
  type: RESET_COUNTERS
})

export const updateConstructorEmptinessAction = (state: boolean): TUpdateConstructorEmptinessAction => ({
  type: UPDATE_CONSTRUCTOR_EMPTINESS,
  state
}) 

export const getOrderFailedAction = (): TGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
}) 

export const getOrderSuccessAction = (res: TUpdatedOrder): TGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  res
}) 

export const getOrderRequestAction = (): TGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST
}) 

export const createOrderThunk: AppThunk = (ingredientsList: string[]) => {
  return function (dispatch: AppDispatch) {
    if (ingredientsList.length === 0) {
      dispatch(updateConstructorEmptinessAction(true));
      return;
    }
    dispatch(getOrderRequestAction());
    getOrderId(ingredientsList)
      .then((res) => {
        if (res.success) {
          dispatch(getOrderSuccessAction(res.order));
          localStorage.setItem("orderModal", "true");
          localStorage.setItem(
            "newOrderConfirmedDetails",
            JSON.stringify(res.order)
          );
        }
      })
      .catch((e) => {
        dispatch(getOrderFailedAction());
      });
  };
};

export const closeOrderModalAction: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(clearConstructorAction());
    dispatch(resetCountersAction());
    localStorage.setItem("orderModal", "false");
    localStorage.removeItem("newOrderConfirmedDetails");
  };
};