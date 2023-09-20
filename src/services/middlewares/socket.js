import { getCookie, handleTokens } from "../../utils/utils";
import Api from "../../api/api.js";

const api = new Api();

export const socketMiddleware = (wsUrl, wsActions, user) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

      if (type === wsInit) {
        if (user) {
          const accessToken = getCookie("token");
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            const refreshData = await api.updateToken();
            handleTokens(refreshData);
            const accessToken = getCookie("token");
            socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
          }
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          if (socket) {
            dispatch({ type: onClose, payload: event });
          }
        };

        if (type === wsDisconnect) {
            socket.close();
            socket = null;
        }
      }

      next(action);
    };
  };
};