import { ContentType, type HttpMethod } from '../enums/enums';

type ApiRequestOptions = {
  readonly method: HttpMethod;
  readonly url: string;
  readonly path?: Record<string, any>;
  readonly cookies?: Record<string, any>;
  readonly headers?: Record<string, any>;
  readonly query?: Record<string, any>;
  readonly formData?: Record<string, any>;
  readonly body?: any;
  readonly mediaType?: ContentType;
  readonly responseHeader?: string;
  readonly errors?: Record<number, string>;
};

export { type ApiRequestOptions };
