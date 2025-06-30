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
