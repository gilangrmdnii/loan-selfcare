'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchLoanHistory } from '@/features/loanHistory/loanHistorySlice'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'

export default function LoanHistoryClient() {
  const [activeTab, setActiveTab] = useState<'pinjaman' | 'pembayaran'>('pinjaman')
  const router = useRouter()
  const searchParams = useSearchParams()
  const msisdn = searchParams.get('msisdn')
  const transactionId = searchParams.get('transaction_id')

  const dispatch = useAppDispatch()
  const { paid, payment, loading } = useAppSelector((state) => state.loanHistory)

  useEffect(() => {
    if (msisdn && transactionId) {
      dispatch(fetchLoanHistory({ msisdn, transactionId }))
    }
  }, [msisdn, transactionId, dispatch])

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="w-full max-w-screen-sm mx-auto px-4 pt-4">
        <Header />
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#0F1B60] mb-4 mt-4">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" /></svg>
          Kembali
        </button>

        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('pinjaman')} className={`flex-1 py-2 font-semibold text-sm ${activeTab === 'pinjaman' ? 'text-red-600 border-b-2 border-red-600' : 'text-[#0F1B60]'}`}>Pinjaman</button>
          <button onClick={() => setActiveTab('pembayaran')} className={`flex-1 py-2 font-semibold text-sm ${activeTab === 'pembayaran' ? 'text-red-600 border-b-2 border-red-600' : 'text-[#0F1B60]'}`}>Pembayaran</button>
        </div>

        {loading ? (
          <p className="mt-6 text-center text-sm">Memuat data...</p>
        ) : activeTab === 'pinjaman' ? (
          paid.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {paid.map((item, i) => (
                <li key={i} className="text-sm text-[#0F1B60] border p-3 rounded">
                  <p className="font-semibold">{item.offerDescription || 'Paket Darurat'}</p>
                  <p className="text-gray-600 text-xs italic">{item.offerCommercialName || '-'}</p>
                  <p className="mt-1">Nominal: Rp{item.value.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-500">Mulai: {item.initial_date}</p>
                  <p className="text-xs text-gray-500">Jatuh Tempo: {item.due_date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState label="Belum Ada Riwayat Pinjaman" />
          )
        ) : (
          payment.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {payment.map((item, i) => (
                <li key={i} className="text-sm text-[#0F1B60] border p-3 rounded">
                  <p>{item.transaction_id}</p>
                  <p>{item.value.toLocaleString()} Rupiah</p>
                  <p>{item.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState label="Belum Ada Riwayat Pembayaran" />
          )
        )}
      </div>

      <div className="px-4 py-5 border-t border-gray-100 w-full max-w-screen-sm mx-auto">
        <button onClick={() => router.push('/emergency')} className="w-full bg-red-600 text-white font-semibold py-3 rounded-full text-sm">Pilih Paket Darurat</button>
      </div>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center mt-12">
      <Image src="/assets/images/Illustration.png" alt="Empty State" width={100} height={100} className="mx-auto" />
      <p className="mt-6 text-sm font-semibold text-[#0F1B60]">{label}</p>
    </div>
  )
}
