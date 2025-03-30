export interface IWSActions {
  wsInit: string;
  wsSendMessage: string;
  onOpen: "WS_CONNECTION_SUCCESS";
  onClose: "WS_CONNECTION_CLOSED";
  onError: "WS_CONNECTION_ERROR";
  onMessage: "WS_GET_MESSAGE";
}
