// features/purchaseOffer/purchaseOfferSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/index'

interface PurchasePayload {
    id: string
    subscribe: boolean
    version: string
    campaignOffer: boolean
    campaignId: string
    campaignTrackingId: string
}

interface PurchaseState {
    loading: boolean
    success: boolean
    error: string | null
}

const initialState: PurchaseState = {
    loading: false,
    success: false,
    error: null,
}

export const purchaseOffer = createAsyncThunk(
    'purchase/submit',
    async (payload: PurchasePayload, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const error = await res.json()
                return rejectWithValue(error.message || 'Gagal melakukan pembelian')
            }

            return await res.json()
        } catch (err: unknown) {
            let message = 'Terjadi kesalahan'
            if (err instanceof Error) {
                message = err.message
            }
            return rejectWithValue(message)
        }
    }
)


const purchaseOfferSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        resetPurchase: (state) => {
            state.loading = false
            state.success = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(purchaseOffer.pending, (state) => {
                state.loading = true
                state.success = false
                state.error = null
            })
            .addCase(purchaseOffer.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(purchaseOffer.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload as string
            })
    },
})

export const { resetPurchase } = purchaseOfferSlice.actions
export const selectPurchase = (state: RootState) => state.purchase
export default purchaseOfferSlice.reducer
