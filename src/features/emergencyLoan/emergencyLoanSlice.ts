import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface EmergencyLoanState {
    msisdn: string | null
    transactionID: string | null
    uuid: string | null
    oustanding: number | null
    offerCommercialName: string | null
    value: number | null
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
    value: null,
    loading: false,
    error: null,
    eligible: true,
    hasPaid: false,
}

export const fetchEmergencyLoan = createAsyncThunk(
    'emergencyLoan/fetchEmergencyLoan',
    async (token: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/emergency-loan?token=${token}`)
            if (!res.ok) throw new Error('Failed to fetch')

            const data = await res.json()
            return data
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
                const data = action.payload
                console.log('[DEBUG] fetchEmergencyLoan fulfilled payload:', data)
                state.loading = false
                state.msisdn = data.msisdn
                state.transactionID = data.transactionID ?? null
                state.uuid = data.uuid ?? null
                state.oustanding = data.oustanding ?? 0
                state.offerCommercialName = data.offerCommercialName?.trim?.() ?? null
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
