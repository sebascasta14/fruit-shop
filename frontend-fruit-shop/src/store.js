import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { apiSlice } from './features/api/apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)

})

export default store
