import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  useStore as useStoreBase,
} from "react-redux";

import { reducer as burgerReducer } from "./burger";
import { reducer as ingredientReducer } from "./ingredients";
import { reducer as modalReducer } from "./modal";
import { reducer as orderReducer } from "./order";
import { reducer as userReducer } from "./user";
import { reducer as passwordReducer } from "./password";
import { reducer as feedReducer } from "./feed";
import { socketMiddleware } from "./ws";
import {
  connect,
  disconnect,
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from "./feed";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredients: ingredientReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  password: passwordReducer,
  feed: feedReducer,
});

const WS = socketMiddleware({
  connect,
  disconnect,
  onConnecting,
  onOpen,
  onError,
  onMessage,
  onClose,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(WS),
});

export const useStore: () => typeof store = useStoreBase;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
