// /app/api/paket-darurat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from "moment"
import CryptoJS from "crypto-js"

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders(custParam: string) {
  const timestamp = moment().unix().toString();
  const plainText = API_KEY + SECRET_KEY + timestamp;
  const sha256Hash = CryptoJS.SHA256(plainText);
  const base64 = CryptoJS.enc.Base64.stringify(sha256Hash);

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-SIGNATURE': base64,
    'X-CUST-PARAM': custParam,
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
    return NextResponse.json({ error: 'Missing custParam' }, { status: 400 })
  }

  // Tanpa transactionId
  const url =
    `${BASE_URL}/api/v1/offers?` +
    `type=PURCHASE&filteredBy=balance&mode=SELF&version=v4&paymentMethod=LOAN`

  try {
    const headers = buildHeaders(custParam)
    const res = await axios.get<OffersResponse>(url, { headers })

    const offers = res.data?.data?.offers ?? []

    const mappedOffers = offers.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.longdesc,
      terms: '',
      quota: item.quota ?? '-',
      price: parseInt(item.price ?? '0'),
      promoPrice: null,
      duration: item.validity ?? '-',
    }))

    return NextResponse.json({ offers: mappedOffers })
  } catch (err) {
    console.error('Gagal memuat paket darurat:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
