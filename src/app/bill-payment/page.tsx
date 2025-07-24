'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BillPaymentPage() {
  const isPayment = process.env.NEXT_PUBLIC_PAYMENT

  const router = useRouter()

  const pulsaOptions = [
    { nominal: 15000 },
    { nominal: 20000 },
    { nominal: 30000 },
    { nominal: 40000 },
    { nominal: 50000 },
    { nominal: 75000 },
  ]

  const [msisdn, setMsisdn] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('msisdn') ?? ''
    setMsisdn(stored)
  }, [])

  return (
    <div className="min-h-screen bg-white px-4 pb-20 max-w-md mx-auto">
      {/* Header */}
      <div className="py-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        {/* <span className="text-lg font-medium text-gray-700">Kembali</span> */}
      </div>

      {/* Tagihan Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">Prabayar {msisdn}</p>
        <div className="flex justify-between items-center mt-1">
          <h3 className="font-bold text-gray-800 text-base">Tagihan Anda</h3>
          <div className="text-right">
            <p className="text-red-600 font-bold text-base">Rp12.000</p>
            <button className="text-xs text-blue-600 font-medium">Riwayat Tagihan</button>
          </div>
        </div>
      </div>

      {/* Tombol Bayar */}
      {isPayment === "true" && (
        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-full mt-4"
        >
          Bayar Tagihan
        </button> 
      )}

      {/* Divider */}
      <div className="flex items-center my-6 gap-2 text-sm text-gray-500 font-medium">
        <div className="flex-1 h-px bg-gray-300" />
        <span>atau bayar dengan Pulsa</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Deskripsi */}
      <p className="text-sm text-gray-600 text-center mb-4">
        Isi ulang pulsa, pulsa pelanggan akan terpotong otomatis sesuai dengan jumlah tagihan.
      </p>

      {/* Daftar Pulsa */}
      <div className="grid grid-cols-2 gap-3">
        {pulsaOptions.map((item) => (
          <div
            key={item.nominal}
            className="bg-gray-50 rounded-xl p-4 border border-gray-100"
          >
            <p className="text-sm font-semibold text-gray-800">Pulsa {item.nominal.toLocaleString('id-ID')}</p>
            <p className="text-xs text-gray-500">30 Hari</p>
            <p className="text-red-600 font-bold mt-1">{item.nominal.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
