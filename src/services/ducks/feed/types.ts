import { createAction } from "@reduxjs/toolkit";
import { IConnectAction, WebsocketStatus } from "../ws";
import { IOrder } from "@/shared";

export const connect = createAction<IConnectAction, "feed/onConnect">(
  "feed/onConnect",
);
export const disconnect = createAction("feed/onDisconnect");

export const onConnecting = createAction("feed/onConnecting");
export const onOpen = createAction("feed/onOpen");
export const onError = createAction<string, "feed/onError">("feed/onError");
export const onClose = createAction("feed/onClose");
export const onMessage = createAction<
  IFeedResponse | IWSTokenError,
  "feed/onMessage"
>("feed/onMessage");

export interface IWSTokenError {
  success: false;
  message: string;
}

export interface IInitialState {
  status: WebsocketStatus;
  ordersFeed: IOrdersFeed;
  error: string | null;
}

export type IOrdersFeed = Omit<IFeedResponse, "success">;

export interface IFeedResponse {
  success: true;
  total: number;
  totalToday: number;
  orders: IOrder[];
}
