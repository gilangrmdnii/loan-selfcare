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
      agree,
      bookingId,
      code,
    } = body

    const headers = buildHeaders("custParam")

    const payload = {
      agree: agree,
      bookingId: bookingId,
    }

    console.log(`[API] GET /api/v1/booking/consent/${code}`)
    console.log(`[BODY] ${JSON.stringify(payload)}`)
    
    const res = await axios.post(`${BASE_URL}/api/v1/booking/consent/${code}`, payload, {
      headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false,
      }),
    });

    return NextResponse.json({ success: true, data: res.data })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed booking consent:', error.response?.data || error.message)
      return NextResponse.json(
        { error: 'Failed booking consent', detail: error.response?.data },
        { status: 500 }
      )
    } else if (error instanceof Error) {
      console.error('Failed booking consent:', error.message)
      return NextResponse.json(
        { error: 'Failed booking consent', detail: error.message },
        { status: 500 }
      )
    } else {
      console.error('Failed booking consent:', error)
      return NextResponse.json(
        { error: 'Failed booking consent', detail: String(error) },
        { status: 500 }
      )
    }
  }
}