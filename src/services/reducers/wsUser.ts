import {
  WS_USER_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  TWsUserActions,
} from "../actions/ws";
import { TOrder } from "../types/data";

type TInitialState = {
  wsConnected: boolean,
  orders: TOrder[],
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
};

export const wsUserReducer = (state = initialState, action: TWsUserActions): TInitialState => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};