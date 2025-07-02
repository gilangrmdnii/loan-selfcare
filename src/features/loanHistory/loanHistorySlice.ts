import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface LoanRecord {
    offerDescription: string | null
    offerCommercialName: string | null
    value: number
    initial_date: string
    due_date: string
}

export interface PaymentRecord {
    value: number
    date: string
    transaction_id: string
}

export interface LoanHistoryState {
    paid: LoanRecord[]
    payment: PaymentRecord[]
    loading: boolean
    error: string | null
}

const initialState: LoanHistoryState = {
    paid: [],
    payment: [],
    loading: false,
    error: null,
}

export const fetchLoanHistory = createAsyncThunk(
    'loanHistory/fetch',
    async ({ msisdn, transactionId }: { msisdn: string; transactionId: string }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/loan-history?msisdn=${msisdn}&transaction_id=${transactionId}`)
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            return {
                paid: (data.data.paid_record ?? []).map((item: Record<string, unknown>) => ({
                    offerDescription: item.offerDescription as string | null,
                    offerCommercialName: (item['offerCommercialName '] as string | null) ?? null,
                    value: item.value as number,
                    initial_date: item.initial_date as string,
                    due_date: item.due_date as string,
                })),
                payment: (data.data.payment_record ?? []).map((item: Record<string, unknown>) => ({
                    transaction_id: item.transaction_id as string,
                    value: item.value as number,
                    date: item.date as string,
                })),
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
                state.paid = action.payload.paid
                state.payment = action.payload.payment
            })
            .addCase(fetchLoanHistory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default loanHistorySlice.reducer
