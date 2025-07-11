import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface LoanRecord {
  offerDescription: string | null
  offerCommercialName: string | null
  value: number
  outstanding: number | null
  initial_date: string
  channel_transaction_id: string
  channelId: string | null
  status: string
  channelName: string | null
  productName: string | null
}

export interface PaymentRecord {
  transaction_id: string
  value: number
  outstanding: number | null
  date: string
  productName: string | null
  channelId: string | null
  channelName: string | null
}

export interface LoanHistoryState {
  loans: LoanRecord[]
  payment: PaymentRecord[]
  outstanding: number | null
  loading: boolean
  error: string | null
}

const initialState: LoanHistoryState = {
  loans: [],
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
        status: string
        channelName: string
      }

      interface PaymentApiItem {
        transactionId: string
        paidAmount: number
        createdAt: string
        productName: string | null
        channelId: string | null
        channelName: string
      }

      return {
        loans: (data.data.loans ?? []).map((item: LoanApiItem) => ({
            offerDescription: item.productName ?? null,
            offerCommercialName: item.productName ?? null,
            value: item.value,
            initial_date: item.createdAt,
            channel_transaction_id: item.transactionId,
            channelId: item.channelId ?? null,
            status: item.status ?? null,
            productName: item.productName ?? null,
            channelName: item.channelName ?? null,
          })),
        payment: (data.data.payments ?? []).map((item: PaymentApiItem) => ({
          transaction_id: item.transactionId,
          value: item.paidAmount,
          date: item.createdAt,
          productName: item.productName ?? null,
          channelId: item.channelId ?? null,
          channelName: item.channelName ?? null,
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
        state.loans = action.payload.loans
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
