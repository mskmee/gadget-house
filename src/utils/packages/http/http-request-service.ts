/* eslint-disable no-unused-vars */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import FormData from 'form-data';

import { ApiError } from './libs/exceptions/api-error';
import {
  isBlob,
  isDefined,
  isFormData,
  isString,
  isSuccess,
  shallowStringify,
} from './libs/helpers/helpers';
import type { ApiRequestOptions, ApiResult } from './libs/types/types';
import { LocalStorageKey, localStorageService } from '../local-storage';
import { logout, setTokens } from '@/store/auth/auth-slice';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);

    if (!refreshToken) throw new Error("No refresh token");

    const response = await axios.post(`${axios.defaults.baseURL}/updateAccessToken?refreshToken=${refreshToken}`);

    const { access_token, refresh_token } = response.data;

    localStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
    localStorageService.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);

    (await import("@/store")).store.dispatch(setTokens({ accessToken: access_token, refreshToken: refresh_token }));

    return access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    (await import("@/store")).store.dispatch(logout());
    return null;
  }
};

const getQueryString = (params: Record<string, any>): string => {
  const qs: string[] = [];

  const append = (key: string, value: any) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: any) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });

  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }

  return '';
};

const getUrl = (options: ApiRequestOptions): string => {
  const path = options.url.replace(
    /{(.*?)}/g,
    (substring: string, group: string) => {
      // eslint-disable-next-line no-prototype-builtins
      if (options.path?.hasOwnProperty(group)) {
        return encodeURI(String(options.path[group]));
      }
      return substring;
    },
  );

  if (options.query) {
    return `${path}${getQueryString(options.query)}`;
  }
  return path;
};

const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData();

    const process = (key: string, value: any) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };

    Object.entries(options.formData)
      .filter(([_, value]) => isDefined(value))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => process(key, v));
        } else {
          process(key, value);
        }
      });

    return formData;
  }
  return undefined;
};

const getHeaders = async (
  options: ApiRequestOptions,
  formData?: FormData,
): Promise<Record<string, string>> => {
  const formHeaders =
    (typeof formData?.getHeaders === 'function' && formData?.getHeaders()) ||
    {};

  const headers = Object.entries({
    Accept: 'application/json',
    ...options.headers,
    ...formHeaders,
  })
    .filter(([_, value]) => isDefined(value))
    .reduce(
      (_headers, [key, value]) => ({
        ..._headers,
        [key]: String(value),
      }),
      {} as Record<string, string>,
    );

  const accessToken = localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN)
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  if (options.body) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers['Content-Type'] = options.body.type || 'application/octet-stream';
    } else if (isString(options.body)) {
      headers['Content-Type'] = 'text/plain';
    } else if (!isFormData(options.body)) {
      headers['Content-Type'] = 'application/json';
    }
  }

  return headers;
};

const getResponseHeader = (
  response: AxiosResponse<any>,
  responseHeader?: string,
): string | undefined => {
  if (responseHeader) {
    const content = response.headers[responseHeader];
    if (isString(content)) {
      return content;
    }
  }
  return undefined;
};

const getResponseBody = (response: AxiosResponse<any>): any => {
  if (response.status !== 204) {
    return response.data;
  }
  return undefined;
};

const catchErrorCodes = (
  options: ApiRequestOptions,
  result: ApiResult,
): void => {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    422: 'Unprocessable entity',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    800: 'Network Timeout',
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }

  if (!result.ok) {
    throw new ApiError(options, result, 'Generic Error');
  }
};

const sendRequest = async <T>(
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: FormData | undefined,
  headers: Record<string, string>,
): Promise<AxiosResponse<T>> => {
  const source = axios.CancelToken.source();

  const accessToken = localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN);

  if (accessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const requestConfig: AxiosRequestConfig = {
    url,
    headers,
    data: body ?? formData,
    method: options.method,
    cancelToken: source.token,
  };
  console.log("Axios Base URL:", axios.defaults.baseURL);
  console.log("Final Request URL:", requestConfig.url);

  try {
    if (import.meta.env.DEV) {
      console.debug(
        `${requestConfig.method}] HTTP Request: `,
        shallowStringify({
          baseUrl: axios.defaults.baseURL,
          endpoint: requestConfig.url,
          body: requestConfig.data,
          headers: requestConfig.headers,
        }),
      );
    }
    return await axios.request(requestConfig);
  } catch (error) {
    const axiosError = error as AxiosError<T>;

    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          requestConfig.headers = requestConfig.headers || {};
          requestConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          localStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, newAccessToken);

          return await axios.request(requestConfig);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        (await import("@/store")).store.dispatch(logout());
      }
    }

    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};

/**
 * Request method
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(options: ApiRequestOptions): Promise<T> => {
  return new Promise((res, rej) => {
    (async () => {
      try {
        const url = getUrl(options);
        const formData = getFormData(options);
        const body = options.body;
        const headers = await getHeaders(options, formData);

        const response = await sendRequest<T>(
          options,
          url,
          body,
          formData,
          headers,
        );
        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(
          response,
          options.responseHeader,
        );

        const result: ApiResult = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody,
        };

        catchErrorCodes(options, result);

        res(result.body);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(`[${options.method}] - ${error.status} error:`, {
            details: error.body,
            url: error.url,
          });
        } else if (error instanceof AxiosError) {
          console.error(`[${options.method}]Axios error:`, {
            message: error.message,
            baseUrl: error.config?.baseURL ?? '',
            url: error.config?.url ?? '',
          });
        } else {
          console.error(`[${options.method}] Unknown error:`, {
            error,
          });
        }
        rej(error);
      }
    })();
  });
};
