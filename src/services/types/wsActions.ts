import {
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, 
  WS_DISCONNECT, 
  WS_GET_FEED,
  WS_GET_USER_ORDERS, 
  WS_SEND_MESSAGE, 
  WS_USER_CONNECTION_CLOSED, 
  WS_USER_CONNECTION_ERROR, 
  WS_USER_CONNECTION_START, 
  WS_USER_CONNECTION_SUCCESS, 
  WS_USER_DISCONNECT, 
  WS_USER_SEND_MESSAGE } from "../actions/ws";


export interface IwsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_FEED;
  wsDisconnect: typeof WS_DISCONNECT;
}

export interface IwsUserActions {
  wsInit: typeof WS_USER_CONNECTION_START;
  wsSendMessage: typeof WS_USER_SEND_MESSAGE;
  onOpen: typeof WS_USER_CONNECTION_SUCCESS;
  onClose: typeof WS_USER_CONNECTION_CLOSED;
  onError: typeof WS_USER_CONNECTION_ERROR;
  onMessage: typeof WS_GET_USER_ORDERS;
  wsDisconnect: typeof WS_USER_DISCONNECT;
}