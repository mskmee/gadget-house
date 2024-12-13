import { HttpStatusCode } from 'axios';

type Constructor = {
  status?: HttpStatusCode;
  message?: string;
};

class BaseError extends Error {
  status: HttpStatusCode;

  constructor({
    status = HttpStatusCode.NotAcceptable,
    message = 'Http request error',
  }: Constructor = {}) {
    super(message);
    this.name = new.target.name;
    this.status = status;
  }

  static isBaseError(error: unknown): error is BaseError {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return true;
    }

    return false;
  }
}

export { BaseError };
