import { IOptions, METHODS } from "./types.ts";
import queryString from "query-string";
import { BASE_URL } from "./routes.ts";

export class Api {
  get<T = object>(url: string, options: IOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.GET });
  }

  put<T = object>(url: string, options: IOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.PUT });
  }
  post<T = object>(url: string, options: IOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.POST });
  }
  delete<T = object>(url: string, options: IOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: METHODS.DELETE });
  }

  async request<T = object>(url: string, options: IOptions = {}): Promise<T> {
    const {
      headers = {
        accept: "application/json",
        "content-type": "application/json",
      },
      method = METHODS.GET,
      data,
      baseUrl = BASE_URL,
      ...rest
    } = options;
    const queryParams =
      method === METHODS.GET && !!data && typeof data === "object"
        ? Object.keys(data).length > 0
          ? `?${queryString.stringify(data)}`
          : ""
        : "";
    const fullUrl = `${baseUrl}${url}${queryParams}`;
    const isFormData = data instanceof FormData;
    const body = data ? (isFormData ? data : JSON.stringify(data)) : null;

    const response = await fetch(fullUrl, {
      headers,
      method,
      body,
      ...rest,
    });

    if (!response.ok) {
      throw new Error("Something is wrong");
    }

    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      throw new Error("Not a valid JSON");
    }

    return responseData;
  }
}

export const api = new Api();
