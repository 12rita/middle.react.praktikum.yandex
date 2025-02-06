import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IActionPayload,
  IExtendedActionPayload,
  IExtendedIngredient,
} from "@/services/ducks/burger/types.ts";
import { v4 as uuidv4 } from "uuid";
const initialState: IExtendedIngredient[] = [];

export const burgerSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<IExtendedActionPayload>) => {
        const { sectionId, item, key, additionalKey } = action.payload;
        const keyedItem = { ...item, key };
        if (sectionId === "bun") {
          if (state.length && state[0].type === "bun") {
            if (state[0]._id === item._id) {
              state.shift();
              state.pop();
            } else {
              state.shift();
              state.pop();
              state.unshift(keyedItem);
              state.push({ ...item, key: additionalKey });
            }
          } else {
            state.unshift(keyedItem);
            state.push({ ...item, key: additionalKey });
          }
        } else {
          if (state.length && state[state.length - 1].type === "bun")
            state.splice(state.length - 1, 0, keyedItem);
          else state.push(keyedItem);
        }
      },
      prepare: (payload: IActionPayload) => {
        return {
          payload: { ...payload, key: uuidv4(), additionalKey: uuidv4() },
        };
      },
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
