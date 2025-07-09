// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit'
import emergencyLoanReducer from '@/features/emergencyLoan/emergencyLoanSlice'
import loanHistoryReducer from '@/features/loanHistory/loanHistorySlice'
import emergencyPackagesReducer from '@/features/emergencyPackages/emergencyPackagesSlice'
import emergencyBalanceReducer from '@/features/emergencyBalance/emergencyBalanceSlice'
import purchaseReducer from '@/features/purchaseOffer/purchaseOfferSlice'
import initiateUppReducer from '@/features/initiateUpp/initiateUppSlice'



export const makeStore = () =>
  configureStore({
    reducer: {
      emergencyLoan: emergencyLoanReducer,
      loanHistory: loanHistoryReducer,
      emergencyPackages: emergencyPackagesReducer,
      emergencyBalance: emergencyBalanceReducer,
      purchase: purchaseReducer,
      initiateUpp: initiateUppReducer,

    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
