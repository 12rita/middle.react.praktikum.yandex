import { createSlice } from "@reduxjs/toolkit";

import {
  IInitialState,
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from "@/services/ducks/feed/types.ts";
import { WebsocketStatus } from "@/services/ducks/ws";

const initialFeed = { orders: [], total: 0, totalToday: 0 };

const initialState: IInitialState = {
  status: WebsocketStatus.OFFLINE,
  ordersFeed: initialFeed,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(onOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.error = null;
      })
      .addCase(onClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(onError, (state, action) => {
        state.error = action.payload;
        state.status = WebsocketStatus.ERROR;
        state.ordersFeed = initialFeed;
      })
      .addCase(onMessage, (state, action) => {
        if (!action.payload.success) {
          state.error = action.payload.message;
          state.status = WebsocketStatus.ERROR;
          state.ordersFeed = initialFeed;
        } else state.ordersFeed = action.payload;
      });
  },
});

export const { actions, reducer } = feedSlice;
