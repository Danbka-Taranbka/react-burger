import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
} from "../actions/index.js";

const initialState = {
  orderInfo: {},
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  isEmpty: true,
};

export const orderReducer = (state = initialState, action) => {
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
        orderInfo: action.payload,
        orderSuccess: true,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case UPDATE_CONSTRUCTOR_EMPTINESS: {
      return {
        ...state,
        isEmpty: action.payload,
        orderSuccess: false,
      };
    }
    default:
      return state;
  }
};