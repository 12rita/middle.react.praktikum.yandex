import type { Middleware, MiddlewareAPI } from "redux";

import type { IWSActions } from "./types";
import { AppDispatch, RootState } from "@/services";
import { api } from "@api";

export const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: IWSActions<R, S>,
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
      sendMessage,
    } = wsActions;
    const { dispatch } = store;
    let isConnected = false;
    let reconnectTimer = 0;
    let withTokenRefresh: boolean = false;
    let url = "";

    const getToken = () => {
      api
        .refreshToken()
        .then(() => {
          dispatch(connect({ url, withToken: true }));
        })
        .catch((err) => {
          dispatch(onError((err as Error).message));
        });
      return;
    };

    return (next) => (action) => {
      if (connect.match(action)) {
        const { url: payloadUrl, withToken = false } = action.payload;
        let wssUrl = payloadUrl;
        withTokenRefresh = withToken;
        if (withToken) {
          if (localStorage.getItem("accessToken"))
            wssUrl += `?token=${(localStorage.getItem("accessToken") ?? "").replace("Bearer ", "") ?? ""}`;
          else {
            getToken();
            return;
          }
        }
        url = payloadUrl;
        socket = new WebSocket(wssUrl);
        onConnecting && dispatch(onConnecting());
        isConnected = true;

        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onclose = () => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, withToken }));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              parsedData.message == "Invalid or missing token"
            ) {
              getToken();
              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          const data = JSON.stringify(action.payload);
          socket.send(data);
        } catch (error) {
          dispatch(onError((error as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  }) as Middleware;
};
