import { ISuccessResponse } from "@api";

export interface IPasswordSetData {
  password: string;
  token: string;
  onSuccess: () => void;
}

export interface IPasswordResetData {
  email: string;
  onSuccess: () => void;
}

export interface ISuccessPayload {
  res: ISuccessResponse;
  onSuccess: () => void;
}
