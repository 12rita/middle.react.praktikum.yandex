import { IUser } from "@/shared";

export interface IUserState {
  loading: boolean;
  error: string;
  user: IUser;
  isAuthenticated: boolean;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export type IProfileResponse = Omit<IUserResponse, "accessToken">;

export interface IUserResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
