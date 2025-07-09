// src/app/api/emergency-loan/route.ts

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders(custParam: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(raw)
    .digest('hex')

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-SIGNATURE': signature,
    'X-CUST-PARAM': custParam,
    'Content-Type': 'application/json',
  }
}

export async function GET(req: NextRequest) {
  const custParam = req.headers.get('x-cust-param')

  console.log('[API] GET /api/emergency-loan')
  console.log('[HEADER] x-cust-param:', custParam)

  if (!custParam) {
    return NextResponse.json(
      { error: 'Missing x-cust-param header' },
      { status: 400 }
    )
  }

  const headers = buildHeaders(custParam)

  console.log('[HEADER] headers:', headers)

  const url = `${BASE_URL}/api/v1/offers/balance`

  console.log('[STEP] Fetching from:', url)

  try {
    const response = await axios.get(url, { headers })
    console.log('[STEP] Response status:', response.status)
    const data = response.data
    console.log('[STEP] Response data:', data)

    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('[ERROR] Failed to fetch balance')
    if (axios.isAxiosError(error)) {
      console.error('[AxiosError]', error.response?.data || error.message)
    } else if (error instanceof Error) {
      console.error('[Error]', error.message)
    } else {
      console.error('[Unknown Error]', error)
    }

    return NextResponse.json(
      { error: 'Failed to fetch balance data' },
      { status: 500 }
    )
  }
}
