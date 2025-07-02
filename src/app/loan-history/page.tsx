import { Suspense } from 'react'
import LoanHistoryClient from './LoanHistoryClient'

export default function LoanHistoryPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-500">Memuat riwayat...</div>}>
      <LoanHistoryClient />
    </Suspense>
  )
}
