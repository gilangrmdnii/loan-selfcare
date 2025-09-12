import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BookingValidateState {
    validation: boolean
    bookingId: string | null
    loading: boolean
    error: string | null
}

const initialState: BookingValidateState = {
    validation: false,
    bookingId: null,
    loading: false,
    error: null,
}

export const fetchBookingValidate = createAsyncThunk(
    'bookingValidate/fetch',
    async (code: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/booking-validate?code=${code}`, {
                method: 'GET',
                credentials: 'include',
            })

            if (!res.ok) throw new Error('Failed to booking validate')

            const data = await res.json()
            return data.data
        } catch {
            return rejectWithValue('Gagal booking validate.')
        }
    }
)

const bookingValidateSlice = createSlice({
    name: 'bookingValidate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingValidate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookingValidate.fulfilled, (state, action) => {
                const data = action.payload
                state.loading = false
                state.bookingId = data.bookingId
                state.validation = data.validation
            })
            .addCase(fetchBookingValidate.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default bookingValidateSlice.reducer