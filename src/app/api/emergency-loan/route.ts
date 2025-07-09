// src/app/api/loan-history/route.ts

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
    'X-Signature': signature,
    'x-cust-param': custParam,
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

    const url = `${BASE_URL}/api/v1/offers/balance`
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
