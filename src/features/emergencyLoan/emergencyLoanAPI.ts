import axios from 'axios'
import crypto from 'crypto'

const API_KEY = process.env.API_KEY || '479b48c9-3a25-4bc8-9f50-b3b83b230b5e'
const SECRET_KEY = process.env.SECRET_KEY || 'd071be7a38706e1135e33d15b05791b8f75c18b4a03b8be5e2a7714c18131f7c'

function buildHeaders() {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const raw = API_KEY + timestamp
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(raw)
    .digest('base64')

  console.log('[DEBUG HEADER]')
  console.log('timestamp:', timestamp)
  console.log('raw:', raw)
  console.log('signature:', signature)

  return {
    'X-API-KEY': API_KEY,
    'X-TIMESTAMP': timestamp,
    'X-Signature': signature,
    'Content-Type': 'application/json',
  }
}

export async function getEmergencyLoanData(token: string) {
  const headers = buildHeaders()

  try {
    const linkRes = await axios.get(
      `https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${token}`,
      { headers }
    )
    const linkJson = linkRes.data

    if (!linkJson?.data) throw new Error('Invalid token / get-link response')

    const { msisdn, transactionID, uuid } = linkJson.data

    const profileURL =
      `https://api-loena-miniapps.nuncorp.id/api/v1/loena/profile?` +
      `filter_history=false&msisdn=${msisdn}&transaction_id=${transactionID}` +
      `&payment_reminder_history=false&filter_history_num=0`

    const profileRes = await axios.get(profileURL, { headers })
    const profileJson = profileRes.data

    const record = profileJson.data?.unpaid_record?.[0] ?? {}

    return {
      msisdn,
      transactionID,
      uuid,
      oustanding: profileJson.data?.oustanding ?? 0,
      offerCommercialName: record.offerCommercialName ?? 'Paket Darurat',
      value: record.value ?? 0,
    }
  } catch (err) {
    console.error('Error fetching emergency loan data:', err)
    throw err
  }
}

export async function getEmergencyLoan(token: string) {
  return await getEmergencyLoanData(token)
}
