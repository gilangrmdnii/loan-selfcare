// app/emergency-loan/page.tsx
import { Suspense } from 'react'
import PartnershipPage from '@/components/pages/PartnershipPage'

export const dynamic = 'force-dynamic' 

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
        <PartnershipPage />
    </Suspense>
  )
}
