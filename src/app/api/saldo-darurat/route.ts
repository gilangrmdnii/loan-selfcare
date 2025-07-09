import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders(custParam: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(raw).digest('hex')

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-Signature': signature,
    'x-cust-param': custParam,
    'Content-Type': 'application/json',
  }
}

type OfferItem = {
  id: string
  name: string
  longdesc: string
  price: string
  quota?: string
  validity?: string
}

type OffersResponse = {
  data?: {
    offers?: OfferItem[]
  }
}

export async function GET(req: NextRequest) {
  const custParam = req.headers.get('x-cust-param') || req.cookies.get('custParam')?.value

  if (!custParam) {
    return NextResponse.json({ error: 'Missing x-cust-param' }, { status: 400 })
  }

  const transactionId = '12345667890'

  const url = `${BASE_URL}/api/v1/offers?type=PURCHASE&transactionId=${transactionId}&filteredBy=balance&mode=SELF&version=v4&paymentMethod=BALANCE`

  try {
    const headers = buildHeaders(custParam)
    const res = await axios.get<OffersResponse>(url, { headers })

    const offers = res.data?.data?.offers ?? []

    const products = offers.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.longdesc,
      quota: item.quota ?? '-',
      duration: item.validity ?? '-',
      price: parseInt(item.price ?? '0'),
      promoPrice: null,
      terms: '', // tambahkan kalau ada data
    }))

    return NextResponse.json({ products })
  } catch (error) {
    console.error('[ERROR] Gagal mengambil saldo darurat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
