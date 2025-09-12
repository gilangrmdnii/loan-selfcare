import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from "crypto-js"
import axios from 'axios'
import moment from "moment"

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  console.log(`[API] GET /api/v1/booking/validate/${code}`)
  
  try {
    const headers = buildHeaders("")
    console.log('[HEADER] headers:', headers)

    const url = `${BASE_URL}/api/v1/booking/validate/${code}`
    console.log('[STEP] Fetching loan profile from:', url)

    const response = await axios.get(url, {
      headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false,
      }),
    });

    console.log('[STEP] Response status:', response.status)
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    console.error('[ERROR] Failed to booking validate')

    if (axios.isAxiosError(error)) {
      console.error('[AxiosError]', error.response?.data || error.message)
    } else if (error instanceof Error) {
      console.error('[Error]', error.message)
    } else {
      console.error('[Unknown Error]', error)
    }

    return NextResponse.json({ error: 'Failed to booking validate' }, { status: 500 })
  }
}
