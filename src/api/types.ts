export enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

interface IError {
  text: string;
  [key: string]: string;
}

export interface IOptions {
  headers?: HeadersInit;
  data?: object | FormData | string;
  timeout?: number;
  mode?: RequestMode;
  method?: keyof typeof METHODS;
  baseUrl?: string;
  credentials?: RequestCredentials;
  onError?: (error: IError) => void;
}

export type TRequest<T = object> = (
  url: string,
  options?: IOptions,
  timeout?: number,
) => Promise<T>;

export interface ISuccessResponse<T = null> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}
