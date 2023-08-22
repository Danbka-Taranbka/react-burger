import { TOrder, TWsOrders } from "../types/data";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_DISCONNECT: "WS_DISCONNECT" = "WS_DISCONNECT";

export const WS_GET_FEED: "WS_GET_FEED" = "WS_GET_FEED";

export const WS_USER_CONNECTION_START: "WS_USER_CONNECTION_START" = "WS_USER_CONNECTION_START";
export const WS_USER_SEND_MESSAGE: "WS_USER_SEND_MESSAGE" = "WS_USER_SEND_MESSAGE";
export const WS_USER_CONNECTION_SUCCESS: "WS_USER_CONNECTION_SUCCESS" = "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_ERROR: "WS_USER_CONNECTION_ERROR" = "WS_USER_CONNECTION_ERROR";
export const WS_USER_CONNECTION_CLOSED: "WS_USER_CONNECTION_CLOSED" = "WS_USER_CONNECTION_CLOSED";
export const WS_GET_USER_ORDERS: "WS_GET_USER_ORDERS" = "WS_GET_USER_ORDERS";
export const WS_USER_DISCONNECT: "WS_USER_DISCONNECT" = "WS_USER_DISCONNECT";

//Feed WS
type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

type TWsGetFeed = {
  readonly type: typeof WS_GET_FEED;
  readonly payload: TWsOrders;
};

type TWsFeedConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
};

type TWsFeedConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

type TWsFeedDisconnect = {
  readonly type: typeof WS_DISCONNECT;
};

export type TWsFeedActions = 
| TWsFeedConnectionStart
| TWsFeedConnectionClosed
| TWsFeedDisconnect
| TWsGetFeed
| TWsConnectionSuccess
| TWsConnectionError;

export const wsFeedConnectionStart = (): TWsFeedConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsFeedConnectionClosed = (): TWsFeedConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsFeedDisconnect = (): TWsFeedDisconnect => {
  return {
    type: WS_DISCONNECT,
  };
};



//User WS
type TWsUserConnectionSuccess = {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
};

type TWsUserConnectionError = {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
};

type TWsGetUserOrders = {
  readonly type: typeof WS_GET_USER_ORDERS;
  payload: TOrder[];
};

type TWsUserConnectionStart = {
  readonly type: typeof WS_USER_CONNECTION_START;
};

type TWsUserConnectionClosed = {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
};

type TWsUserConnectionDisconnect = {
  readonly type: typeof WS_USER_DISCONNECT;
};

export type TWsUserActions = 
| TWsUserConnectionStart
| TWsUserConnectionClosed
| TWsUserConnectionDisconnect
| TWsUserConnectionSuccess
| TWsUserConnectionError
| TWsGetUserOrders;

export const wsUserConnectionStart = (): TWsUserConnectionStart => {
  return {
    type: WS_USER_CONNECTION_START,
  };
};

export const wsUserConnectionClosed = (): TWsUserConnectionClosed => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};

export const wsUserDisconnect = (): TWsUserConnectionDisconnect => {
  return {
    type: WS_USER_DISCONNECT,
  };
};