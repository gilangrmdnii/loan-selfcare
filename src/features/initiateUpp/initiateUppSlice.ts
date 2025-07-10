// features/initiateUpp/initiateUppSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/store'

interface InitiatePayload {
  channel: string
  amount: number
}

interface InitiateUppState {
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: InitiateUppState = {
  loading: false,
  success: false,
  error: null,
}

export const initiateUpp = createAsyncThunk(
  'upp/initiate',
  async (payload: InitiatePayload, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        return rejectWithValue(error.message || 'Gagal memulai proses UPP')
      }

      return await res.json()
    } catch (error: unknown) {
      let message = 'Terjadi kesalahan'
      if (error instanceof Error) {
        message = error.message
      }
      return rejectWithValue(message)
    }
  }
)

const initiateUppSlice = createSlice({
  name: 'initiateUpp',
  initialState,
  reducers: {
    resetInitiate: (state) => {
      state.loading = false
      state.success = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateUpp.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(initiateUpp.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(initiateUpp.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload as string
      })
  },
})

export const { resetInitiate } = initiateUppSlice.actions
export const selectInitiateUpp = (state: RootState) => state.initiateUpp
export default initiateUppSlice.reducer
