// app/api/loan-history/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const msisdn = req.nextUrl.searchParams.get('msisdn')
  if (!msisdn) {
    return NextResponse.json({ error: 'Missing msisdn' }, { status: 400 })
  }

  try {
    // Ganti langsung ke endpoint mock
    const MOCK_URL = 'https://mocki.io/v1/8b5e17af-1d34-4585-9ded-88264a98f98e'

    // Di versi mock ini, kamu bisa abaikan msisdn jika tidak diperlukan
    const response = await axios.get(MOCK_URL)

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('[LoanHistory Error]', error.response?.data || error.message)
    } else if (error instanceof Error) {
      console.error('[LoanHistory Error]', error.message)
    } else {
      console.error('[LoanHistory Error]', error)
    }

    return NextResponse.json({ error: 'Failed to fetch loan history' }, { status: 500 })
  }
}
