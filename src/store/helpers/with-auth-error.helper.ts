import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ApiError } from '@/utils/packages/http/libs/exceptions/api-error';
import { AuthorizationError } from '@/utils/packages/http/libs/exceptions/authorization-error';

export const withAuthErrorHandler = <TArg, TReturn>(
  thunkFn: AsyncThunkPayloadCreator<TReturn, TArg>,
): AsyncThunkPayloadCreator<TReturn, TArg> => {
  return async (arg, thunkAPI) => {
    try {
      const result = thunkFn(arg, thunkAPI);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new AuthorizationError({
          message: error.body?.message,
        });
      }
      throw error;
    }
  };
};
