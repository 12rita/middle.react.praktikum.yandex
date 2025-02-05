import { Dispatch, SetStateAction } from "react";

export interface IToasterContext {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export interface IToasterProps {
  error: string;
}
