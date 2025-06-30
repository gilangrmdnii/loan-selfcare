import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEmergencyLoanData } from './emergencyLoanAPI'

export interface EmergencyLoanState {
    msisdn: string | null
    transactionID: string | null
    uuid: string | null
    oustanding: number | null
    offerCommercialName: string | null
    value: number | null
    loading: boolean
    error: string | null
}

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

export const fetchEmergencyLoanFromLocal = createAsyncThunk(
    'emergencyLoan/fetchFromLocalProxy',
    async (token: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/proxy-get-link?token=${token}`)
            if (!res.ok) throw new Error('Failed proxy request')
            return await res.json()
        } catch {
            return rejectWithValue('Gagal ambil data pinjaman darurat (proxy).')
        }
    }
)


export const fetchEmergencyLoan = createAsyncThunk(
    'emergencyLoan/fetchEmergencyLoan',
    async (token: string, { rejectWithValue }) => {
        try {
            return await getEmergencyLoanData(token)
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
            // original (fetchEmergencyLoan langsung dari API eksternal)
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

            // 👇 tambahan untuk proxy (local API)
            .addCase(fetchEmergencyLoanFromLocal.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEmergencyLoanFromLocal.fulfilled, (state, action) => {
                Object.assign(state, action.payload, { loading: false })
            })
            .addCase(fetchEmergencyLoanFromLocal.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})


export default emergencyLoanSlice.reducer
