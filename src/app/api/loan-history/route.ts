import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import crypto from 'crypto'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL! // <-- pastikan ada di .env

function buildHeaders() {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(raw)
    .digest('hex')

  console.log('[HEADER] Timestamp:', timestamp)
  console.log('[HEADER] Raw string:', raw)
  console.log('[HEADER] Signature:', signature)

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-Signature': signature,
    'Content-Type': 'application/json',
  }
}

export async function GET(req: NextRequest) {
  const msisdn = req.nextUrl.searchParams.get('msisdn')
  const transactionId = req.nextUrl.searchParams.get('transaction_id')

  console.log('[API] Loan History Params:', { msisdn, transactionId })

  if (!msisdn || !transactionId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  try {
    const headers = buildHeaders()

    // ✅ Gunakan BASE_URL dari environment
    const url = `${BASE_URL}/api/v1/loena/profile?filter_history=true&msisdn=${msisdn}&transaction_id=${transactionId}&payment_reminder_history=true&filter_history_num=5`

    console.log('[API] Requesting to:', url)

    const response = await axios.get(url, { headers })
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[ERROR] loan-history:', errorMessage)

    if (axios.isAxiosError(error)) {
      console.error('[AXIOS ERROR]', error.response?.data)
    }

    return NextResponse.json({ error: 'Failed to fetch loan history' }, { status: 500 })
  }
}
