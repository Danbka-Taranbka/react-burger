import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED,
  TWsFeedActions,
} from "../actions/ws";
import { TOrder } from "../types/data";

type TInitialState = {
  wsConnected: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsFeedReducer = (state = initialState, action: TWsFeedActions): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_FEED:
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        orders: orders,
        total: total,
        totalToday: totalToday,
      };

    default:
      return state;
  }
};