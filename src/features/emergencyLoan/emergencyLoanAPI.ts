// src/features/emergencyLoan/emergencyLoanAPI.ts
import crypto from 'crypto'

const API_KEY = '479b48c9-3a25-4bc8-9f50-b3b83b230b5e'
const SECRET_KEY =
    'd071be7a38706e1135e33d15b05791b8f75c18b4a03b8be5e2a7714c18131f7c'

function buildHeaders() {
    const timestamp = Math.floor(Date.now() / 1000).toString()

    // pesan = apiKey + timestamp
    const raw = API_KEY + timestamp

    // HMAC‑SHA256 → BASE64
    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(raw)
        .digest('base64')          

    return {
        'X-API-KEY': API_KEY,
        'X-TIMESTAMP': timestamp,
        'X-Signature': signature, 
        'Content-Type': 'application/json',
    } as const
}

function assertOk(res: Response, ctx: string) {
    if (!res.ok) {
        throw new Error(`${ctx} failed: ${res.status} ${res.statusText}`)
    }
}

export async function getEmergencyLoanData(token: string) {
    const headers = buildHeaders()

    /* 1. Tukar token -------------------------------------------------------- */
    const linkRes = await fetch(
        `https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${token}`,
        { method: 'GET', headers, mode: 'cors' }
    )
    assertOk(linkRes, 'get-link')
    const linkJson = await linkRes.json()
    if (!linkJson?.data) throw new Error('Invalid token / get-link response')

    const { msisdn, transactionID, uuid } = linkJson.data

    /* 2. Ambil profil ------------------------------------------------------- */
    const profileURL =
        `https://api-loena-miniapps.nuncorp.id/api/v1/loena/profile?` +
        `filter_history=false&msisdn=${msisdn}&transaction_id=${transactionID}` +
        `&payment_reminder_history=false&filter_history_num=0`

    const profileRes = await fetch(profileURL, { headers, mode: 'cors' })
    assertOk(profileRes, 'profile')
    const profileJson = await profileRes.json()

    const record = profileJson.data?.unpaid_record?.[0] ?? {}

    return {
        msisdn,
        transactionID,
        uuid,
        oustanding: profileJson.data?.oustanding ?? 0,
        offerCommercialName: record.offerCommercialName ?? 'Paket Darurat',
        value: record.value ?? 0,
    }
}

/* re‑export helper */
export async function getEmergencyLoan(token: string) {
    try {
        return await getEmergencyLoanData(token)
    } catch (e) {
        console.error('Error fetching emergency loan data:', e)
        throw e
    }
}
