import { IOptions, ITokenResponse, METHODS } from "./types.ts";
import queryString from "query-string";
import { BASE_URL, TOKEN } from "./routes.ts";

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
  patch<T = object>(
    url: string,
    options: IOptions = {},
  ): Promise<T | { error: string }> {
    return this.request<T>(url, {
      ...options,
      method: METHODS.PATCH,
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

  async refreshToken() {
    return this.post<ITokenResponse>(TOKEN, {
      data: { token: localStorage.getItem("refreshToken") },
    }).then((refreshData) => {
      if (!("success" in refreshData)) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
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

        return res.json().then((err) => Promise.reject(err));
      })
      .then((res) => {
        if (res && res.success) {
          return res;
        }
        // не забываем выкидывать ошибку, чтобы она попала в `catch`
        return Promise.reject(`Ответ не success: ${res}`);
      })
      .catch(async (err) => {
        if (err.message === "jwt expired") {
          const refreshData = await this.refreshToken(); //обновляем токен

          return this.request(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: refreshData.accessToken,
            },
          });
        } else {
          return Promise.reject(err);
        }
      });
  }
}

export const api = new Api();
