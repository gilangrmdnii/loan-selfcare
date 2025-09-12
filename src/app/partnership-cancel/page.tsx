// app/emergency-loan/page.tsx
import { Suspense } from 'react'
import PartnershipCancelPage from '@/components/pages/PartnershipCancelPage'

export const dynamic = 'force-dynamic' 

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
        <PartnershipCancelPage />
    </Suspense>
  )
}
