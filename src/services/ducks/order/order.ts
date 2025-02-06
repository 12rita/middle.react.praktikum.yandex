import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, ORDER } from "@api";
import { IInitialState, IOrder, IOrdersResponse } from "./types.ts";

const initialState: IInitialState = {
  name: "",
  order: {} as IOrder,
  loading: false,
  error: "",
};

export const postOrderNumber = createAsyncThunk(
  "order/get",
  async (ids: string[]) => {
    return await api.post<IOrdersResponse>(ORDER, {
      data: { ingredients: ids },
    });
  },
);

export const orderSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrderNumber.fulfilled, (state, action) => {
      state.loading = false;
      const { name, order } = action.payload as IOrdersResponse;
      state.order = order;
      state.name = name;
    });
    builder.addCase(postOrderNumber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postOrderNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { actions, reducer } = orderSlice;
