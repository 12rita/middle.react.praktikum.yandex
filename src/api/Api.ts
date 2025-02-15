import { IOptions, METHODS } from "./types.ts";
import queryString from "query-string";
import { BASE_URL } from "./routes.ts";

export class Api {
  get<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
    return this.request<T>(url, {
      ...options,
      method: METHODS.GET,
    });
  }

  put<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
    return this.request<T>(url, {
      ...options,
      method: METHODS.PUT,
    });
  }
  post<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
    return this.request<T>(url, {
      ...options,
      method: METHODS.POST,
    });
  }
  delete<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
    return this.request<T>(url, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  async request<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
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

    return await fetch(fullUrl, {
      headers,
      method,
      body,
      ...rest,
    })
      .then((res) => {
        if (res.ok) {
          let responseData;
          try {
            responseData = res.json();
          } catch (error) {
            return Promise.reject(`Not a valid JSON`);
          }
          return responseData;
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          return res;
        }
        // не забываем выкидывать ошибку, чтобы она попала в `catch`
        return Promise.reject(`Ответ не success: ${res}`);
      });
  }
}

export const api = new Api();
