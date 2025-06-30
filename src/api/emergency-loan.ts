// src/pages/api/emergency-loan.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const headers = {
  'X-API-KEY': '479b48c9-3a25-4bc8-9f50-b3b83b230b5e',
  'SECRET-KEY': 'd071be7a38706e1135e33d15b05791b8f75c18b4a03b8be5e2a7714c18131f7c',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string

  try {
    const linkRes = await fetch(
      `https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${token}`,
      { headers }
    )
    const linkData = await linkRes.json()

    if (!linkData.data) {
      return res.status(401).json({ error: 'Unauthorized or invalid token' })
    }

    const { msisdn, transactionID, uuid } = linkData.data

    const profileRes = await fetch(
      `https://api-loena-miniapps.nuncorp.id/api/v1/loena/profile?filter_history=false&msisdn=${msisdn}&transaction_id=${transactionID}&payment_reminder_history=false&filter_history_num=0`,
      { headers }
    )
    const profileData = await profileRes.json()
    const record = profileData.data?.unpaid_record?.[0] || {}

    res.status(200).json({
      msisdn,
      transactionID,
      uuid,
      oustanding: profileData.data?.oustanding,
      offerCommercialName: record.offerCommercialName || 'Paket Darurat',
      value: record.value || 0,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
