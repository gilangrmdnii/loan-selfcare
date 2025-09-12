// app/emergency-loan/page.tsx
import { Suspense } from 'react'
import PartnershipNotavailablePage from '@/components/pages/PartnershipNotavailablePage'

export const dynamic = 'force-dynamic' 

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
        <PartnershipNotavailablePage />
    </Suspense>
  )
}
