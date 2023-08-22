import { TUpdatedOrder } from "../../utils/utils";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
  TOGGLE_ORDER_MODAL,
  TOrderActions
} from "../actions/order";

type TInitialState = {
  orderInfo: TUpdatedOrder | null | undefined,
  orderRequest: boolean,
  orderFailed: boolean,
  orderSuccess: boolean,
  isEmpty: boolean,
  orderModal: boolean,
}

const initialState: TInitialState = {
  orderInfo: null,
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  isEmpty: true,
  orderModal: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderInfo: action.res,
        orderSuccess: true,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case UPDATE_CONSTRUCTOR_EMPTINESS: {
      return {
        ...state,
        isEmpty: action.state,
        orderSuccess: false,
      };
    }
    case TOGGLE_ORDER_MODAL: {
      return {
        ...state,
        orderModal: !state.orderModal,
      };
    }
    default:
      return state;
  }
};