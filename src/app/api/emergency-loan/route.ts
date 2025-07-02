import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!

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
  const token = req.nextUrl.searchParams.get('token')

  console.log('[API] GET /api/emergency-loan')
  console.log('[API] Received token:', token)

  if (!token) {
    console.error('[ERROR] Missing token in query')
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  try {
    const headers = buildHeaders()

    console.log('[STEP 1] Fetching /get-link with token...')

    const linkRes = await axios.get(
      `https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${token}`,
      { headers }
    )
    console.log('[STEP 1] /get-link response status:', linkRes.status)

    const linkJson = linkRes.data
    console.log('[STEP 1] /get-link response data:', linkJson)

    const { msisdn, transactionID, uuid } = linkJson.data
    console.log('[INFO] msisdn:', msisdn)
    console.log('[INFO] transactionID:', transactionID)
    console.log('[INFO] uuid:', uuid)

    const profileURL =
      `https://api-loena-miniapps.nuncorp.id/api/v1/loena/profile?` +
      `filter_history=false&msisdn=${msisdn}&transaction_id=${transactionID}` +
      `&payment_reminder_history=false&filter_history_num=0`

    console.log('[STEP 2] Fetching profile data...')
    console.log('[STEP 2] profileURL:', profileURL)

    const profileRes = await axios.get(profileURL, { headers })
    console.log('[STEP 2] profile response status:', profileRes.status)

    const profileJson = profileRes.data
    console.log('[STEP 2] profile data:', profileJson)

    const record = profileJson.data?.unpaid_record?.[0] ?? {}

    const response = {
      msisdn,
      transactionID,
      uuid,
      oustanding: profileJson.data?.oustanding ?? 0,
      offerCommercialName: record.offerCommercialName ?? 'Paket Darurat',
      value: record.value ?? 0,
    }

    console.log('[SUCCESS] Final response:', response)

    return NextResponse.json(response)
  } catch (err: unknown) {
    console.error('[ERROR] Unexpected error occurred in emergency-loan route')
    if (err instanceof Error) {
      console.error('[ERROR] Message:', err.message)
      console.error('[ERROR] Stack:', err.stack)
    } else {
      console.error('[ERROR] Raw:', err)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
