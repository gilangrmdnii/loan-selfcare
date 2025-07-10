// /app/api/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import moment from "moment"
import CryptoJS from "crypto-js"
import https from "https";

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
    console.log("[POST] Start handling /api/upp-initiate")

    const body = await req.json()
    console.debug("[STEP] Request Body:", JSON.stringify(body))

    const custParam = req.headers.get('x-cust-param') || req.cookies.get('custParam')?.value
    if (!custParam) {
      return NextResponse.json({ error: 'Missing custParam' }, { status: 400 })
    }

    const headers = buildHeaders(custParam)

    console.log("[STEP] Calling /upp/initiate")
    // Step 1: Call /upp/initiate
    const uppRes = await axios.post(`${BASE_URL}/api/v1/upp/initiate`, body, { headers })
    console.debug("[STEP] /upp/initiate Response:", uppRes.data)

    const token = uppRes.data?.data
    if (!token) {
      console.error("[ERROR] Token tidak ditemukan dalam response")
      return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 500 })
    }

    // Step 2: Call /auth/redirect dan ambil location dari response header
    console.log("[STEP] Calling /auth/redirect with token")
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const redirectRes = await axios.post(
      `${UPP_URL}/api/auth/redirect`,
      { token },
      {
        httpsAgent,
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      }
    );

    const location = redirectRes.headers['location']
    console.debug("[STEP] Redirect Location Header:", location)
     if (!location) {
      console.error("[ERROR] Redirect URL tidak ditemukan di header")
      return NextResponse.json(
        { error: "Redirect URL tidak ditemukan di header" },
        { status: 500 }
      )
    }

    console.log("[SUCCESS] Redirect URL ditemukan:", location)

    return NextResponse.json({ success: true, redirectUrl: location })
  } catch (error: unknown) {
    console.error("[EXCEPTION] Caught in try/catch")

    if (axios.isAxiosError(error)) {
      console.error(
        "[AXIOS ERROR]",
        error.response?.status,
        error.response?.data || error.message
      )

      console.error('Gagal initiate:', error.response?.data || error.message)
      return NextResponse.json(
        {
          error: "Gagal memuat halaman",
          detail: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      )
    } else if (error instanceof Error) {
      console.error("[JS ERROR]", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error("[UNKNOWN ERROR]", error)
      return NextResponse.json({ error: "Unknown error" }, { status: 500 })
    }
  }
}
