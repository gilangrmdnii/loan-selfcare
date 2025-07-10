import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from "moment"
import CryptoJS from "crypto-js"

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!
const CHANNEL_ID = process.env.CHANNEL_ID!

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      subscribe,
      version,
      campaignOffer,
      campaignId,
      campaignTrackingId,
    } = body

    const custParam = req.headers.get('x-cust-param') || req.cookies.get('custParam')?.value

    if (!custParam || !id || !version) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const isSubscribed = subscribe === 'true' || subscribe === true
    const iscampaignOfferd = campaignOffer === 'true' || campaignOffer === true

    const headers = buildHeaders(custParam)

    const payload = {
      channelId: CHANNEL_ID,
      id,
      subscribe: isSubscribed ?? false,
      version,
      campaignOffer: iscampaignOfferd ?? false,
      campaignId: campaignId ?? '',
      campaignTrackingId: campaignTrackingId ?? '',
    }

    const res = await axios.post(`${BASE_URL}/api/v1/offers/purchase`, payload, {
      headers,
    })

    return NextResponse.json({ success: true, data: res.data })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Gagal purchase:', error.response?.data || error.message)
      return NextResponse.json(
        { error: 'Gagal melakukan pembelian', detail: error.response?.data },
        { status: 500 }
      )
    } else if (error instanceof Error) {
      console.error('Gagal purchase:', error.message)
      return NextResponse.json(
        { error: 'Gagal melakukan pembelian', detail: error.message },
        { status: 500 }
      )
    } else {
      console.error('Gagal purchase:', error)
      return NextResponse.json(
        { error: 'Gagal melakukan pembelian', detail: String(error) },
        { status: 500 }
      )
    }
  }
}
