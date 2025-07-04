'use client'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'

export default function BillCard() {
  const {
    msisdn,
    oustanding,
    offerCommercialName,
    loading,
    transactionID, // pastikan ini tersedia di redux
  } = useAppSelector((state) => state.emergencyLoan)

  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Memuat tagihan...</p>
  }

  return (
    <div className="bg-gray-50 rounded-xl mt-4 p-4 shadow-sm">
      <p className="text-xs text-gray-500">Prabayar {msisdn || '-'}</p>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-base text-gray-800">Tagihan Anda</h2>
        <div className="text-right">
          <p className="text-red-600 font-bold text-lg">
            Rp{oustanding?.toLocaleString('id-ID') || '0'}
          </p>
          {msisdn && transactionID && (
            <Link
              className="text-sm font-bold text-blue-600"
              href={{
                pathname: '/loan-history',
                query: {
                  msisdn,
                  transaction_id: transactionID,
                },
              }}
            >
              Lihat Riwayat
            </Link>
          )}
          {!msisdn && (
            <p className="text-sm text-gray-500">Nomor prabayar tidak tersedia</p>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm flex items-center gap-1">
        <span className="text-red-500">⚠</span>
        <span className="text-gray-500">
          {offerCommercialName
            ? `Produk: ${offerCommercialName}`
            : 'Tagihan darurat tersedia'}
        </span>
      </p>
    </div>
  )
}