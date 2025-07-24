'use client'

import SmartcardBlockNotice from "./SmartcardBlockNotice"
import { fetchLoanHistory } from '@/features/loanHistory/loanHistorySlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { getTokenFromSearchOrCookie } from '@/utils/token'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Header() {
  const { loans, payment, loading } = useAppSelector((state) => state.loanHistory)
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [blockDate, setBlockDate] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const rawToken = searchParams.get('token')
    const token = getTokenFromSearchOrCookie(rawToken)
    if (token) {
      dispatch(fetchLoanHistory(token))
    }
  }, [dispatch, searchParams])

  useEffect(() => {
    if (loans.length > 0) {
      const today = dayjs()

      // Ambil transaksi dengan tanggal paling dekat ke hari ini
      const closestLoan = loans.reduce((prev, curr) => {
        const prevDiff = Math.abs(dayjs(prev.initial_date).diff(today))
        const currDiff = Math.abs(dayjs(curr.initial_date).diff(today))
        return currDiff < prevDiff ? curr : prev
      })

      const calculatedBlockDate = dayjs(closestLoan.initial_date)
      setBlockDate(calculatedBlockDate.format('YYYY-MM-DD'))

      const isPast = calculatedBlockDate.isBefore(today, 'day') || calculatedBlockDate.isSame(today, 'day')
      setIsBlocked(isPast)
    }
  }, [loans])

  const handlePay = () => {
    window.location.href = "/payment"
  }

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="p-4 flex flex-col items-start gap-2">
          <img src="/assets/logo/Telkomsel-Logo.png" alt="Telkomsel" className="h-5" />
        </div>
      </div>

      {blockDate && (
        <SmartcardBlockNotice
          isBlocked={isBlocked}
          blockDate={blockDate}
          onPay={handlePay}
        />
      )}
    </div>
  )
}