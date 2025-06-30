// app/emergency-loan/page.tsx
import { Suspense } from 'react'
import EmergencyLoanPage from '@/components/pages/EmergencyLoanPage'

export const dynamic = 'force-dynamic' // opsional, kalau kamu ingin bypass SSG

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
      <EmergencyLoanPage />
    </Suspense>
  )
}
