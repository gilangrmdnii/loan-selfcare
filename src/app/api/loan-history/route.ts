// src/app/api/loan-history/route.ts

import { NextRequest, NextResponse } from 'next/server'
import moment from "moment"
import CryptoJS from "crypto-js"
import axios from 'axios'

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
  const custParam = req.headers.get('x-cust-param') || req.cookies.get('custParam')?.value

  console.log('[API] GET /api/loan-history')
  console.log('[HEADER] x-cust-param:', custParam)

  if (!custParam) {
    return NextResponse.json(
      { error: 'Missing x-cust-param header' },
      { status: 400 }
    )
  }

  try {
    const headers = buildHeaders(custParam)

    const url = `${BASE_URL}/api/v1/loena/profile`
    console.log('[STEP] Fetching loan profile from:', url)

    const response = await axios.get(url, { headers })

    console.log('[STEP] Response status:', response.status)
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    console.error('[ERROR] Failed to fetch loan history')

    if (axios.isAxiosError(error)) {
      console.error('[AxiosError]', error.response?.data || error.message)
    } else if (error instanceof Error) {
      console.error('[Error]', error.message)
    } else {
      console.error('[Unknown Error]', error)
    }

    return NextResponse.json({ error: 'Failed to fetch loan history' }, { status: 500 })
  }
}
