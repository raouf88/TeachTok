import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Home} from '../typings';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cross-platform.rp.devfactory.com',
  }),
  endpoints: builder => ({
    getContent: builder.query<Home.Content, boolean | undefined>({
      query: (isFollowing?: boolean) => (isFollowing ? 'following' : 'for_you'),
    }),
    getAnswer: builder.query<Home.MCQAnswer, number>({
      query: (id: number) => `reveal?id=${id}`,
    }),
  }),
});

export const {useLazyGetContentQuery, useLazyGetAnswerQuery} = homeApi;
