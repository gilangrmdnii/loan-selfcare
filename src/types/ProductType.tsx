export interface Product {
  id: string
  name: string
  description: string
  price: number
  promoPrice?: number | null
  quota?: string
  duration?: string
  subscribe?: boolean
  version?: string
  campaignOffer?: boolean
  campaignId?: string
  campaignTrackingId?: string
}
export interface ProductWithTerms extends Product {
  terms: string
}