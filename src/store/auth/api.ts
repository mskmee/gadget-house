import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base-query';

export interface ICreateNewAdmin {
  fullName: string;
  email: string;
  password: string;
}

export interface IResponseCreateNewAdmin {
  message: string;
  fullName: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    createNewAdmin: builder.mutation<IResponseCreateNewAdmin, ICreateNewAdmin>({
      query: (data) => ({
        url: '/create-new-admin',
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const { useCreateNewAdminMutation } = authApi;
