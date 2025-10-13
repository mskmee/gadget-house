import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { localStorageService } from '@/utils/packages/local-storage';
import { LocalStorageKey } from '@/utils/packages/local-storage';
import { setTokens } from './auth/auth-slice';
import { logout } from './auth/auth-slice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppRoute } from '@/enums/Route';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorageService.getItem(
      LocalStorageKey.ACCESS_TOKEN,
    );
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorageService.getItem(
      LocalStorageKey.REFRESH_TOKEN,
    );

    if (refreshToken) {
      try {
        const refreshResult = await rawBaseQuery(
          {
            url: `/updateAccessToken?refreshToken=${refreshToken}`,
            method: 'POST',
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { access_token, refresh_token } = refreshResult.data as {
            access_token: string;
            refresh_token: string;
          };

          localStorageService.setItem(
            LocalStorageKey.ACCESS_TOKEN,
            access_token,
          );
          localStorageService.setItem(
            LocalStorageKey.REFRESH_TOKEN,
            refresh_token,
          );

          api.dispatch(
            setTokens({
              accessToken: access_token,
              refreshToken: refresh_token,
            }),
          );

          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          handleForceLogout(api);
        }
      } catch (error) {
        handleForceLogout(api);
      }
    } else {
      handleForceLogout(api);
    }
  }

  return result;
};

function handleForceLogout(api: any) {
  localStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
  localStorageService.removeItem(LocalStorageKey.REFRESH_TOKEN);
  api.dispatch(logout());
  window.location.href = AppRoute.SIGN_IN;
}
