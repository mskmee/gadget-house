import { HttpStatusCode } from 'axios';

import { BaseError } from './base-error';

type Constructor = {
  status?: HttpStatusCode;
  message?: string;
};

const ERROR_NAME = 'AuthorizationError';
const DEFAULT_MESSAGE = 'Authorization error occurred';

class AuthorizationError extends BaseError {
  constructor({
    status = HttpStatusCode.Unauthorized,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super({ status, message });
    this.name = ERROR_NAME;
  }

  static isAuthorizationError(error: unknown): error is AuthorizationError {
    return BaseError.isBaseError(error) && (error as Error).name === ERROR_NAME;
  }
}

export { AuthorizationError };
