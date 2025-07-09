import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface EmergencyLoanState {
  msisdn: string | null
  transactionID: string | null
  uuid: string | null
  oustanding: number | null
  offerCommercialName: string | null
  value: number | null
  amount: number | null
  expiry: string | null
  loading: boolean
  error: string | null
  eligible: boolean
  hasPaid: boolean
}

const initialState: EmergencyLoanState = {
  msisdn: null,
  transactionID: null,
  uuid: null,
  oustanding: null,
  offerCommercialName: null,
  amount: null,
  expiry: null,
  value: null,
  loading: false,
  error: null,
  eligible: true,
  hasPaid: false,
}

export const fetchEmergencyLoan = createAsyncThunk(
  'emergencyLoan/fetchEmergencyLoan',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('custParam')
      if (!token) throw new Error('Token tidak ditemukan di cookie.')

      const res = await fetch('/api/emergency-loan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-cust-param': token,
        },
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Gagal mengambil data')

      const data = await res.json()
      return data
    } catch {
      return rejectWithValue('Gagal memuat data pinjaman darurat.')
    }
  }
)

const emergencyLoanSlice = createSlice({
  name: 'emergencyLoan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyLoan.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmergencyLoan.fulfilled, (state, action) => {
        const data = action.payload
        state.loading = false
        state.msisdn = data.msisdn
        state.transactionID = data.transactionID ?? null
        state.uuid = data.uuid ?? null
        state.oustanding = data.oustanding ?? 0
        state.offerCommercialName = data.offerCommercialName?.trim?.() ?? null
        state.amount = parseInt(data.data?.amount ?? '0', 10) || 0
        state.expiry = data.data?.expiry ?? null
        state.value = data.value ?? 0
        state.eligible = true
        state.hasPaid = data.oustanding === 0
      })
      .addCase(fetchEmergencyLoan.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default emergencyLoanSlice.reducer