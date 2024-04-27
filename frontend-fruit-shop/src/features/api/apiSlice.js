import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-fruit-shop.vercel.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }), // Hace las veces de Axios
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
      providesTags: ['Users'], // Me permite ejecutar un llamado
      transformResponse: response => response.sort((a, b) =>
        (a.username[0].toUpperCase() < b.username[0].toUpperCase()) ? -1
          : (a.username[0].toUpperCase() > b.username[0].toUpperCase()) ? 1 : 0)
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetUsersQuery,
  useLoginMutation
} = apiSlice
