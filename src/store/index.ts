// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit'
import emergencyLoanReducer from '@/features/emergencyLoan/emergencyLoanSlice'
import loanHistoryReducer from '@/features/loanHistory/loanHistorySlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      emergencyLoan: emergencyLoanReducer,
      loanHistory: loanHistoryReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
