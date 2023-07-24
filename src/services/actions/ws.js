export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_DISCONNECT = "WS_DISCONNECT";

export const WS_GET_FEED = "WS_GET_FEED";

export const WS_USER_CONNECTION_START = "WS_USER_CONNECTION_START";
export const WS_USER_SEND_MESSAGE = "WS_USER_SEND_MESSAGE";
export const WS_USER_CONNECTION_SUCCESS = "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_ERROR = "WS_USER_CONNECTION_ERROR";
export const WS_USER_CONNECTION_CLOSED = "WS_USER_CONNECTION_CLOSED";
export const WS_GET_USER_ORDERS = "WS_GET_USER_ORDERS";
export const WS_USER_DISCONNECT = "WS_USER_DISCONNECT";

export const wsFeedConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsFeedConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsFeedDisconnect = () => {
  return {
    type: WS_DISCONNECT,
  };
};

export const wsUserConnectionStart = () => {
  return {
    type: WS_USER_CONNECTION_START,
  };
};

export const wsUserConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};

export const wsUserDisconnect = () => {
  return {
    type: WS_USER_DISCONNECT,
  };
};