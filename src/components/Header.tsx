'use client'

import SmartcardBlockNotice from "./SmartcardBlockNotice"
import { fetchLoanHistory } from '@/features/loanHistory/loanHistorySlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useSearchParams } from 'next/navigation'
import { getTokenFromSearchOrCookie } from '@/utils/token'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Header() {
  const { loans } = useAppSelector((state) => state.loanHistory)
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const [blockDate, setBlockDate] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    const rawToken = searchParams.get('token')
    const token = getTokenFromSearchOrCookie(rawToken)
    if (token) {
      dispatch(fetchLoanHistory(token))
    }
  }, [dispatch, searchParams])

  useEffect(() => {
    const unpaidLoans = loans.filter(loan => loan.status !== 'PAID')

    if (unpaidLoans.length === 0) {
      setBlockDate(null)
      setIsBlocked(false)
      setShowCountdown(false)
      return
    }

    const oldestLoan = unpaidLoans.reduce((prev, curr) => {
      return dayjs(curr.initial_date).isBefore(dayjs(prev.initial_date)) ? curr : prev
    })

    console.log(oldestLoan);

    const loanDate = dayjs(oldestLoan.initial_date)
    const blockThreshold = loanDate.add(90, 'day')

    setBlockDate(blockThreshold.format('YYYY-MM-DD'))

    const now = dayjs()
    const daysUntilBlock = blockThreshold.diff(now, 'day')

    if (now.isAfter(blockThreshold) || now.isSame(blockThreshold, 'day')) {
      setIsBlocked(true)
      setShowCountdown(false)
    } else if (daysUntilBlock <= 3) {
      setIsBlocked(false)
      setShowCountdown(true)
    } else {
      setIsBlocked(false)
      setShowCountdown(false)
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

      {blockDate && (isBlocked || showCountdown) && (
        <SmartcardBlockNotice
          isBlocked={isBlocked}
          blockDate={blockDate}
          onPay={handlePay}
        />
      )}
    </div>
  )
}