import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, ISuccessResponse, PASSWORD_RESET, RESET } from "@api";
import {
  IPasswordResetData,
  IPasswordSetData,
  ISuccessPayload,
} from "./types.ts";
import { IInitialState } from "@/shared";

const initialState: IInitialState = {
  loading: false,
  error: "",
};

export const passwordReset = createAsyncThunk(
  "password/reset",
  async ({ email, onSuccess }: IPasswordResetData) => {
    const res = await api.post<ISuccessResponse>(PASSWORD_RESET, {
      data: { email },
    });

    return "error" in res ? res.error : { res, onSuccess };
  },
);

export const passwordSet = createAsyncThunk(
  "password/set",
  async ({ password, token, onSuccess }: IPasswordSetData) => {
    const res = await api.post<ISuccessResponse>(RESET, {
      data: {
        password,
        token,
      },
    });

    return "error" in res ? res.error : { res, onSuccess };
  },
);

export const passwordSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passwordReset.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { onSuccess } = action.payload as ISuccessPayload;
      onSuccess();
    });
    builder.addCase(passwordReset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(passwordReset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(passwordSet.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { onSuccess } = action.payload as ISuccessPayload;
      onSuccess();
    });
    builder.addCase(passwordSet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(passwordSet.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { actions, reducer } = passwordSlice;
