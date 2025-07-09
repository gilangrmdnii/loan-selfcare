import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'
import moment from "moment"

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders(custParam: string) {
  const CryptoJS = require("crypto-js");
  var timestamp = moment().unix().toString();
  var plainText = API_KEY + SECRET_KEY + timestamp;
  var sha256Hash = CryptoJS.SHA256(plainText);
  var base64 = CryptoJS.enc.Base64.stringify(sha256Hash);

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

    const headers = buildHeaders(custParam)

    const payload = {
      id,
      subscribe: subscribe ?? false,
      version,
      campaignOffer: campaignOffer ?? false,
      campaignId: campaignId ?? '',
      campaignTrackingId: campaignTrackingId ?? '',
      paymentMethod: 'LOAN',
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
