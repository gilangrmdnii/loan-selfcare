// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import dummyReducer from './slices/dummySlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      dummy: dummyReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
