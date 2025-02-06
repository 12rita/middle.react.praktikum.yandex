import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EType } from "@/shared";
import { IExtendedIngredient } from "@/services/ducks/burger/types.ts";
import { v4 as uuidv4 } from "uuid";
const initialState: IExtendedIngredient[] = [];

export const burgerSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<{ item: IExtendedIngredient; sectionId: EType }>,
    ) => {
      const { sectionId, item } = action.payload;
      if (sectionId === "bun") {
        if (state.length && state[0].type === "bun") {
          if (state[0]._id === item._id) {
            state.shift();
            state.pop();
          } else {
            state.shift();
            state.pop();
            state.unshift(item);
            state.push({ ...item, key: uuidv4() });
          }
        } else {
          state.unshift(item);
          state.push({ ...item, key: uuidv4() });
        }
      } else {
        if (state.length && state[state.length - 1].type === "bun")
          state.splice(state.length - 1, 0, item);
        else state.push(item);
      }
    },
    switchIngredients: (
      state,
      action: PayloadAction<{ prevIdx: number; newIdx: number }>,
    ) => {
      const { prevIdx, newIdx } = action.payload;
      const item = state[prevIdx];
      state.splice(prevIdx, 1);
      state.splice(newIdx, 0, item);
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { actions, reducer } = burgerSlice;
