// pages/api/proxy-get-link.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const API_KEY = '479b48c9-3a25-4bc8-9f50-b3b83b230b5e'
const SECRET_KEY = 'd071be7a38706e1135e33d15b05791b8f75c18b4a03b8be5e2a7714c18131f7c'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Token is required' })
  }

  try {
    const timestamp = Date.now().toString()

    // Generate HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', SECRET_KEY)
    hmac.update(API_KEY + timestamp)
    const signature = hmac.digest('hex')

    const headers = {
      'X-API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
      'X-TIMESTAMP': timestamp,
      'X-SIGNATURE': signature,
    }

    const apiRes = await fetch(
      `https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${token}`,
      { headers }
    )

    const data = await apiRes.json()

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
