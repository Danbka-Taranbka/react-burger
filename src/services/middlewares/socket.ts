import { getCookie, handleTokens } from "../../utils/utils";
import { updateToken } from "../../api/api";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";
import { IwsActions, IwsUserActions } from "../types/wsActions";


export const socketMiddleware = (wsUrl: string, 
  wsActions: IwsActions | IwsUserActions, 
  user?: boolean): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

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
            const refreshData = await updateToken();
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