import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from "moment"
import CryptoJS from "crypto-js"

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!
const CHANNEL_ID = process.env.CHANNEL_ID!
const FILTER_SALDO_DARURAT = process.env.FILTER_SALDO_DARURAT!

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
  campaignOffer: string
  campaignId: string
  campaignOfferTrackingId: string
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

  const url =
    `${BASE_URL}/api/v1/offers?` +
    `channelId=${CHANNEL_ID}&type=PURCHASE&filteredBy=${encodeURIComponent(FILTER_SALDO_DARURAT)}&mode=SELF&version=v4&category=PADAR`

  console.log(url)

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
      campaignOffer: item.campaignOffer,
      campaignId: item.campaignId,
      campaignOfferTrackingId: item.campaignOfferTrackingId
    }))

    return NextResponse.json({ products })
  } catch (error) {
    console.error('[ERROR] Gagal mengambil saldo darurat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
