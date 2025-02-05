import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, INGREDIENTS } from "@api";
import {
  IIngredientsResponse,
  IIngredientState,
  TFilteredIngredients,
} from "./types.ts";
import { IIngredient } from "@/shared";

const initialState: IIngredientState = {
  loading: false,
  error: "",
  ingredients: {} as TFilteredIngredients,
  rawIngredients: [],
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  async () => {
    const res = await api.get<IIngredientsResponse>(INGREDIENTS);
    if ("error" in res) {
      return res.error;
    } else if (!res.success) return "Something is wrong(";
    return res.data;
  },
);

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      const bun = (action.payload as IIngredient[]).filter(
        (item) => item.type === "bun",
      );
      const sauce = (action.payload as IIngredient[]).filter(
        (item) => item.type === "sauce",
      );
      const main = (action.payload as IIngredient[]).filter(
        (item) => item.type === "main",
      );
      state.rawIngredients = action.payload as IIngredient[];
      state.ingredients = { bun, sauce, main };
    });
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { actions, reducer } = ingredientSlice;
