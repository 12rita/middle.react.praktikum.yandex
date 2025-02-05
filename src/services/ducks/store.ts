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

export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredients: ingredientReducer,
  modal: modalReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const useStore: () => typeof store = useStoreBase;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
