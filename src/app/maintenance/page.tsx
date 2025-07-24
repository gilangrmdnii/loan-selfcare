'use client'

import Image from 'next/image'

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Image
        src="/assets/images/maintenance.svg"
        alt="Maintenance"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="text-2xl font-bold text-gray-800">Situs Sedang Dalam Pemeliharaan</h1>
      <p className="mt-2 text-gray-600">
        Kami sedang melakukan peningkatan sistem. Silakan kembali beberapa saat lagi.
      </p>
    </main>
  )
}
