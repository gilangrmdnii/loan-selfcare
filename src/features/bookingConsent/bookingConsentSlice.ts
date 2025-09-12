import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface BookingConsentPayload {
    agree: boolean
    bookingId: string | null;
    code: string
}

interface BookingConsentState {
    redirect: boolean
    redirectUrl: string | null
    loading: boolean
    error: string | null
}

const initialState: BookingConsentState = {
    redirect: false,
    redirectUrl: null,
    loading: false,
    error: null,
}

export const fetchBookingConsent = createAsyncThunk(
    'bookingConsent/fetch',
    async (payload: BookingConsentPayload, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/booking-consent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error('Failed booking consent')

            const data = await res.json()
            return data.data
        } catch {
            return rejectWithValue('Failed booking consent.')
        }
    }
)

const bookingConsentSlice = createSlice({
    name: 'bookingConsent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingConsent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookingConsent.fulfilled, (state, action) => {
                const data = action.payload
                state.loading = false
                state.redirectUrl = data.redirectUrl
                state.redirect = data.redirect
            })
            .addCase(fetchBookingConsent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default bookingConsentSlice.reducer