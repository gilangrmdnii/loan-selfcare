'use client'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { decryptCustParam } from '@/utils/decryptCustParam'
import Cookies from 'js-cookie'

export default function BillCard() {
  const {
    // msisdn,
    outstanding,
    loading,
    unpaid,
  } = useAppSelector((state) => state.loanHistory)

  const cipherPassword = "pLo4q4c09lidbpd6yxg50gf0uz1ppx9a"
  const custParam = Cookies.get('custParam') ?? ''
  const decryptedCustParam = decryptCustParam(cipherPassword, custParam)
  const msisdn = decryptCustParam(cipherPassword, decryptedCustParam.split('|')[0])
  localStorage.setItem("msisdn", msisdn);

  const offerCommercialName = unpaid.length > 0 ? unpaid[0].offerCommercialName : null
  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Memuat tagihan...</p>
  }

  return (
    <div className="bg-gray-50 rounded-xl mt-4 p-4 shadow-sm">
      <p className="text-xs text-gray-500">Prabayar {msisdn}</p>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-base text-gray-800">Tagihan Anda</h2>
        <div className="text-right">
          <p className="text-red-600 font-bold text-lg mt-4">
            Rp{outstanding?.toLocaleString('id-ID') || '0'}
          </p>
          {/* {msisdn && transactionID && ( */}
          <Link
            className="text-sm font-bold text-blue-600"
            href={{
              pathname: '/loan-history',
              // query: {
              //   msisdn,
              //   transaction_id: transactionID,
              // },
            }}
          >
            Lihat Riwayat
          </Link>
          {/* )} */}
          {/* {!msisdn && (
            <p className="text-sm text-gray-500">Nomor prabayar tidak tersedia</p>
          )} */}
        </div>
      </div>
      <p className="mt-2 text-sm flex items-center gap-1">
        <span className="text-red-500">⚠</span>
        <p className="text-gray-500">
          {offerCommercialName
            ? `Produk: ${offerCommercialName}`
            : 'Tagihan darurat tersedia'}
        </p>
      </p>
    </div>
  )
}