import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/types/ProductType'

interface EmergencyPackagesState {
  packages: Product[]
  loading: boolean
  error: string | null
}

const initialState: EmergencyPackagesState = {
  packages: [],
  loading: false,
  error: null,
}

export const fetchEmergencyPackages = createAsyncThunk(
  'emergencyPackages/fetchEmergencyPackages',
  async (msisdn: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/paket-darurat?msisdn=${msisdn}`)
      if (!res.ok) throw new Error('Failed to fetch packages')

      const data = await res.json()
      return data.offers
    } catch {
      return rejectWithValue('Gagal memuat paket darurat.')
    }
  }
)

const emergencyPackagesSlice = createSlice({
  name: 'emergencyPackages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyPackages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmergencyPackages.fulfilled, (state, action) => {
        state.loading = false
        state.packages = action.payload
      })
      .addCase(fetchEmergencyPackages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default emergencyPackagesSlice.reducer
