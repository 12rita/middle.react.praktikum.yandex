import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IIngredient } from "@/shared";

import { IModalState } from "@/services/ducks/modal/types.ts";

const initialState: IModalState = {
  activeIngredient: null,
};

export const modalSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IIngredient>) => {
      state.activeIngredient = action.payload;
    },
    closeModal: (state) => {
      state.activeIngredient = null;
    },
  },
});

export const { actions, reducer } = modalSlice;
