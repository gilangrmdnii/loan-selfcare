import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface LoanRecord {
  offerDescription: string | null
  offerCommercialName: string | null
  value: number
  outstanding: number | null
  initial_date: string
  channel_transaction_id: string
  channelId: string | null
  status: 'PAID' | 'UNPAID'
}

export interface PaymentRecord {
  transaction_id: string
  value: number
  outstanding: number | null
  date: string
  productName: string | null
  channelId: string | null
}

export interface LoanHistoryState {
  paid: LoanRecord[]
  unpaid: LoanRecord[]
  payment: PaymentRecord[]
  outstanding: number | null
  loading: boolean
  error: string | null
}

const initialState: LoanHistoryState = {
  paid: [],
  unpaid: [],
  outstanding: null,
  payment: [],
  loading: false,
  error: null,
}

export const fetchLoanHistory = createAsyncThunk(
  'loanHistory/fetch',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/loan-history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-cust-param': token,
        },
      })

      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()

      interface LoanApiItem {
        productName: string | null
        value: number
        createdAt: string
        transactionId: string
        channelId: string | null
        status: 'PAID' | 'UNPAID'

      }

      interface PaymentApiItem {
        transactionId: string
        paidAmount: number
        createdAt: string
        productName: string | null
        channelId: string | null
      }

      return {
        paid: (data.data.loans ?? [])
          .filter((item: LoanApiItem) => item.status === 'PAID')
          .map((item: LoanApiItem) => ({
            offerDescription: item.productName ?? null,
            offerCommercialName: item.productName ?? null,
            value: item.value,
            initial_date: item.createdAt,
            channel_transaction_id: item.transactionId,
            channelId: item.channelId ?? null,
            status: 'PAID',

          })),
        unpaid: (data.data.loans ?? [])
          .filter((item: LoanApiItem) => item.status === 'UNPAID')
          .map((item: LoanApiItem) => ({
            offerDescription: item.productName ?? null,
            offerCommercialName: item.productName ?? null,
            value: item.value,
            initial_date: item.createdAt,
            channel_transaction_id: item.transactionId,
            channelId: item.channelId ?? null,
            status: 'UNPAID',
          })),
        payment: (data.data.payments ?? []).map((item: PaymentApiItem) => ({
          transaction_id: item.transactionId,
          value: item.paidAmount,
          date: item.createdAt,
          productName: item.productName ?? null,
          channelId: item.channelId ?? null,
        })),
        outstanding: data.data.outstanding ?? null,
      }
    } catch {
      return rejectWithValue('Gagal memuat riwayat transaksi')
    }
  }
)

const loanHistorySlice = createSlice({
  name: 'loanHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLoanHistory.fulfilled, (state, action) => {
        state.loading = false
        state.paid = action.payload.paid
        state.unpaid = action.payload.unpaid
        state.payment = action.payload.payment
        state.outstanding = action.payload.outstanding
      })
      .addCase(fetchLoanHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default loanHistorySlice.reducer
