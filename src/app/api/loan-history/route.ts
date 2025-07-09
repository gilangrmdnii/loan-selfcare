import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

const API_KEY = process.env.API_KEY!
const SECRET_KEY = process.env.SECRET_KEY!
const BASE_URL = process.env.BASE_URL!

function buildHeaders(custParam: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(raw).digest('hex')

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-Signature': signature,
    'x-cust-param': custParam,
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

    // 1. Call /api/v1/upp/initiate untuk mendapatkan token
    const initiateRes = await axios.post(`${BASE_URL}/api/v1/upp/initiate`, body, { headers })

    const token = initiateRes.data?.token
    if (!token) {
      return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 500 })
    }

    // 2. Call /api/v1/auth/redirect secara manual untuk ambil location header
    const redirectRes = await axios.post(
      `${BASE_URL}/api/v1/auth/redirect`,
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        maxRedirects: 0, // Jangan otomatis follow redirect
        validateStatus: (status) => status < 400 || status === 301,
      }
    )

    if (redirectRes.status === 301 && redirectRes.headers.location) {
      return NextResponse.json({ redirectUrl: redirectRes.headers.location })
    }

    return NextResponse.json({
      message: 'Tidak ada redirect',
      data: redirectRes.data,
    })
  } catch (error: unknown) {
    console.error('Gagal initiate redirect:', error)

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: 'Terjadi kesalahan saat initiate UPP',
          detail: error.response?.data || error.message,
        },
        { status: 500 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Terjadi kesalahan saat initiate UPP',
          detail: error.message,
        },
        { status: 500 }
      )
    }

    // Fallback untuk error yang tidak dikenal
    return NextResponse.json(
      {
        error: 'Terjadi kesalahan yang tidak diketahui',
        detail: String(error),
      },
      { status: 500 }
    )
  }
}
