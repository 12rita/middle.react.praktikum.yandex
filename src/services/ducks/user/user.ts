import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, ISuccessResponse, LOGIN, LOGOUT, REGISTER, USER } from "@api";
import {
  ILoginData,
  IUserResponse,
  IRegisterData,
  IUserState,
  IProfileResponse,
} from "./types.ts";
import { IUser } from "@/shared";

const initialState: IUserState = {
  loading: false,
  error: "",
  user: {} as IUser,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILoginData) => {
    const res = await api.post<IUserResponse>(LOGIN, {
      data: { email, password },
    });

    return "error" in res ? res.error : res;
  },
);

export const profile = createAsyncThunk("user/get", async () => {
  const res = await api.get<IProfileResponse>(USER, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") ?? "",
    },
  });

  return "error" in res ? res.error : res;
});

export const updateProfile = createAsyncThunk(
  "user/patch",
  async ({ email, password, name }: IRegisterData) => {
    const res = await api.patch<IProfileResponse>(USER, {
      data: { email, password, name },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") ?? "",
      },
    });

    return "error" in res ? res.error : res;
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ onSuccess }: { onSuccess: () => void }) => {
    const res = await api.post<ISuccessResponse>(LOGOUT, {
      data: { token: localStorage.getItem("refreshToken") },
    });
    return "error" in res ? res.error : { res, onSuccess };
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }: IRegisterData) => {
    const res = await api.post<IUserResponse>(REGISTER, {
      data: {
        email,
        password,
        name,
      },
    });

    return "error" in res ? res.error : res;
  },
);

export const userSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { user } = action.payload as IProfileResponse;

      state.user = user;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { user } = action.payload as IProfileResponse;

      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { accessToken, refreshToken, user } =
        action.payload as IUserResponse;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const { accessToken, refreshToken, user } =
        action.payload as IUserResponse;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {} as IUser;
      (action.payload as { onSuccess: () => void }).onSuccess();
    });
  },
});

export const { actions, reducer } = userSlice;
