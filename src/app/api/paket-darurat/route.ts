// /app/api/paket-darurat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders() {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(raw).digest('hex')

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-Signature': signature,
    'Content-Type': 'application/json',
  }
}

// Tipe bonus & prices item
type OfferBonus = {
  quota?: string
}

type OfferPrice = {
  amount: string
  paymentmethod: string
}

type OfferItem = {
  id: string
  name: string
  longdesc: string
  terms: string
  bonus?: OfferBonus[]
  prices?: OfferPrice[]
  price: string
  productlength: string
}

type OffersResponse = {
  data?: {
    offer?: OfferItem[]
  }
}

export async function GET(req: NextRequest) {
  const msisdn = req.nextUrl.searchParams.get('msisdn')

  if (!msisdn) {
    return NextResponse.json({ error: 'MSISDN is required' }, { status: 400 })
  }

  const url =
    `${BASE_URL}/api/v1/offers?` +
    `type=padar&msisdn=${msisdn}&filteredBy=ML2_BP_18&mode=SELF&version=v4&paymentMethod=LOAN`

  try {
    const headers = buildHeaders()
    const res = await axios.get<OffersResponse>(url, { headers })

    const offers = res.data?.data?.offer ?? []

    const mappedOffers = offers.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.longdesc,
      terms: item.terms,
      quota: item.bonus?.[0]?.quota ?? '-',
      price: parseInt(item.prices?.[0]?.amount ?? '0'),
      promoPrice: item.price !== '0' ? parseInt(item.price) : null,
      duration: item.productlength,
    }))

    return NextResponse.json({ offers: mappedOffers })
  } catch (err) {
    console.error('Gagal memuat paket darurat:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
