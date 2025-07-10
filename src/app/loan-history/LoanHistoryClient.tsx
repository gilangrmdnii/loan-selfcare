'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchLoanHistory } from '@/features/loanHistory/loanHistorySlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation'
import { getTokenFromSearchOrCookie } from '@/utils/token'

export default function LoanHistoryClient() {
  const [activeTab, setActiveTab] = useState<'pinjaman' | 'pembayaran'>('pinjaman')
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { paid, unpaid, payment, loading } = useAppSelector((state) => state.loanHistory)

  const combinedLoans = [...unpaid.map(item => ({ ...item, status: 'UNPAID' })), ...paid.map(item => ({ ...item, status: 'PAID' }))]

  const sortedLoans = combinedLoans.sort(
    (a, b) => new Date(b.initial_date).getTime() - new Date(a.initial_date).getTime()
  )

  function formatDateTime(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function mapChannelId(channelId: string | null): string {
    if (!channelId) return ''
    if (channelId === 'i1') return 'MyTelkomsel Basic'
    return channelId
  }

  function getStatusLabel(status: string): { label: string; color: string } {
    if (status === 'UNPAID') return { label: 'Belum Lunas', color: 'text-red-600' }
    // Kamu bisa tambahkan logika Lunas Sebagian jika ada field pembanding
    return { label: 'Lunas', color: 'text-green-600' }
  }

  useEffect(() => {
    const rawToken = searchParams.get('token')
    const token = getTokenFromSearchOrCookie(rawToken)
    if (token) {
      dispatch(fetchLoanHistory(token))
    }
  }, [dispatch, searchParams])

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
          sortedLoans.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {sortedLoans.map((item, i) => {
                const statusInfo = getStatusLabel(item.status)
                return (
                  <li key={i} className="rounded-xl bg-gray-50 px-4 py-3 shadow-sm text-[#0F1B60]">
                    <p className="text-sm font-semibold">
                      {item.productName || '-'}
                    </p>

                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <p>Order ID</p>
                      <p>{item.channel_transaction_id}</p>
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <p>Tanggal Transaksi</p>
                      <p>{formatDateTime(item.initial_date)}</p>
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <p>Melalui</p>
                      <p>{item.channelName || '-'}</p>
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <p>Harga</p>
                      <p className="font-bold text-[#0F1B60]">Rp{item.value.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <p>Status</p>
                      <p className={`${statusInfo.color} font-semibold`}>{statusInfo.label}</p>
                    </div>

                    {item.status === 'UNPAID' && (
                      <div className="mt-2 flex justify-center">
                        <button className="text-xs text-blue-600 font-bold">Bayar Sekarang</button>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <EmptyState label="Belum Ada Riwayat Pinjaman" />
          )
        ) : (
          <ul className="mt-4 space-y-3">
            {payment.map((item, i) => (
              <li key={i} className="rounded-xl bg-gray-50 px-4 py-3 shadow-sm text-[#0F1B60]">
                <p className="text-sm font-semibold">
                  Pembayaran {item.productName ? item.productName : '-'}
                </p>

                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <p>Tanggal Pembayaran</p>
                  <p>{formatDateTime(item.date)}</p>
                </div>

                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <p>Melalui</p>
                  <p>{item.channelName || '-'}</p>
                </div>

                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <p>Jumlah Dibayar</p>
                  <p className="font-bold text-[#0F1B60]">
                    Rp{item.value.toLocaleString('id-ID')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
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
