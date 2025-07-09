// /app/api/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from "moment"
import CryptoJS from "crypto-js"

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!
const UPP_URL = process.env.UPP_URL!

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
    const custParam = req.headers.get('x-cust-param') || req.cookies.get('custParam')?.value
    if (!custParam) {
      return NextResponse.json({ error: 'Missing custParam' }, { status: 400 })
    }

    const headers = buildHeaders(custParam)

    // Step 1: Call /upp/initiate
    const uppRes = await axios.post(`${BASE_URL}/api/v1/upp/initiate`, body, { headers })

    const token = uppRes.data?.data
    if (!token) {
      return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 500 })
    }

    // Step 2: Call /auth/redirect dan ambil location dari response header
    const redirectRes = await axios.post(
      `${UPP_URL}/api/auth/redirect`,
      { token },
      { maxRedirects: 0, validateStatus: (status) => status >= 200 && status < 400 } // cegah follow redirect
    )

    const location = redirectRes.headers['location']
    if (!location) {
      return NextResponse.json({ error: 'Redirect URL tidak ditemukan di header' }, { status: 500 })
    }

    return NextResponse.json({ success: true, redirectUrl: location })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Gagal initiate:', error.response?.data || error.message)
      return NextResponse.json(
        { error: 'Gagal memulai proses UPP', detail: error.response?.data },
        { status: 500 }
      )
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
    }
  }
}
