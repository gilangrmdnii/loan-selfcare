import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EmergencyLoanState } from './emergencyLoanTypes'
import { getEmergencyLoanData } from './emergencyLoanAPI'

const initialState: EmergencyLoanState = {
  msisdn: null,
  transactionID: null,
  uuid: null,
  oustanding: null,
  offerCommercialName: null,
  value: null,
  loading: false,
  error: null,
}

export const fetchEmergencyLoan = createAsyncThunk(
  'emergencyLoan/fetchEmergencyLoan',
  async (_, { rejectWithValue }) => {
    try {
      return await getEmergencyLoanData()
    } catch {
      return rejectWithValue('Failed to fetch emergency loan data.')
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
        Object.assign(state, action.payload, { loading: false })
      })
      .addCase(fetchEmergencyLoan.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default emergencyLoanSlice.reducer
