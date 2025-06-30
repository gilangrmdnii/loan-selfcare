// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit'
import emergencyLoanReducer from '@/features/emergencyLoan/emergencyLoanSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      emergencyLoan: emergencyLoanReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
