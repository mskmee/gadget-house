import type { ApiRequestOptions, ApiResult } from '../types/types';
import { BaseError } from './base-error';

const ERROR_NAME = 'ApiError';

class ApiError extends BaseError {
  public readonly url: string;
  public readonly statusText: string;
  public readonly body: any;
  public readonly request: ApiRequestOptions;

  constructor(
    request: ApiRequestOptions,
    response: ApiResult,
    message: string,
  ) {
    super({ status: response.status, message });

    this.name = ERROR_NAME;
    this.url = response.url;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request;
  }

  static isApiError(error: unknown): error is ApiError {
    return BaseError.isBaseError(error) && (error as Error).name === ERROR_NAME;
  }
}

export { ApiError };
