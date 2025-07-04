export interface Product {
  id: string
  name: string
  description: string
  terms: string
  quota: string
  price: number
  promoPrice?: number | null
  duration: string
}
