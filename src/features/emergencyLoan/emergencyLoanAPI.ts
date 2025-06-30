const tokenInURL = 'aca6ff50e0757e156c411fae3638f297-c9d811b1917405358f663381bb9251e710b90059ed66d89eacdc91bd26709634d0f15ed7db0dc7330bb3739078bdbb135d1ab0540f6f710a567dd635e3381a5ae9e70e1a0853165d08a6e68abf9e8c7b398c719b147d9e2dc2ba6528b6611543'

export async function getEmergencyLoanData() {
  const linkRes = await fetch(`https://api-loena-miniapps.nuncorp.id/api/v1/get-link/${tokenInURL}`)
  
  if (!linkRes.ok) {
    throw new Error('Unauthorized or invalid token.')
  }

  const linkData = await linkRes.json()
  const { msisdn, transactionID, uuid } = linkData.data

  const profileRes = await fetch(
    `https://api-loena-miniapps.nuncorp.id/api/v1/loena/profile?filter_history=false&msisdn=${msisdn}&transaction_id=${transactionID}&payment_reminder_history=false&filter_history_num=0`
  )

  if (!profileRes.ok) {
    throw new Error('Failed to fetch profile data')
  }

  const profileData = await profileRes.json()
  const record = profileData.data.unpaid_record?.[0] || {}

  return {
    msisdn,
    transactionID,
    uuid,
    oustanding: profileData.data.oustanding,
    offerCommercialName: record.offerCommercialName || 'Paket Darurat',
    value: record.value || 0,
  }
}
