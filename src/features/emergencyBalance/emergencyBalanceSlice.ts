// src/features/emergencyBalance/emergencyBalanceSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/types/ProductType'

interface EmergencyBalanceState {
  balances: Product[]
  loading: boolean
  error: string | null
}

const initialState: EmergencyBalanceState = {
  balances: [],
  loading: false,
  error: null,
}

export const fetchEmergencyBalance = createAsyncThunk(
  'emergencyBalance/fetch',
  async (_: void, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/saldo-darurat', {
        method: 'GET',
        credentials: 'include', // penting untuk akses cookie
      })

      if (!res.ok) throw new Error('Failed to fetch emergency balance')

      const data = await res.json()
      return data.products // asumsi struktur data
    } catch {
      return rejectWithValue('Gagal memuat saldo darurat.')
    }
  }
)

const emergencyBalanceSlice = createSlice({
  name: 'emergencyBalance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyBalance.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmergencyBalance.fulfilled, (state, action) => {
        state.loading = false
        state.balances = action.payload
      })
      .addCase(fetchEmergencyBalance.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default emergencyBalanceSlice.reducer
