export enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
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
