'use client'

import { useState, useEffect } from "react"
import dayjs from "dayjs"
import ConfirmModal from '@/components/ConfirmModal'
import { Product } from '@/types/ProductType'

type SmartcardProps = {
  blockDate?: string
  isBlocked: boolean
  onPay: () => void
}

export default function SmartcardBlockNotice({ blockDate, isBlocked, onPay }: SmartcardProps) {
  const [dismissed, setDismissed] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const dismissedToday = localStorage.getItem("dismissedSmartcardDate") === today
    setDismissed(dismissedToday)
  }, [])

  const handleDismiss = () => {
    const today = new Date().toDateString()
    localStorage.setItem("dismissedSmartcardDate", today)
    setDismissed(true)
  }

  if (dismissed) return null

  let message = ""

  if (isBlocked) {
    message = "Akses Internet Anda diblokir. Lunasi tagihan untuk aktifkan kembali."
  } else if (blockDate) {
    const blockDay = dayjs(blockDate).startOf('day')
    const today = dayjs().startOf('day')
    const diffDays = blockDay.diff(today, 'day')

    message = `⚠️ Segera bayar tagihan, Akses internet Anda akan diblokir ${diffDays} hari lagi`
  }

  if (!message) return null

  return (
    <div className="bg-[#FDA22B] text-sm px-4 py-3 font-medium flex items-center justify-between">
      <p className="text-black flex-1">
        {message}
      </p>
      <div className="flex items-center gap-2 ml-4">
        <button onClick={() => setModalOpen(true)} className="text-black font-bold">
          BAYAR
        </button>
        <button onClick={handleDismiss} className="text-black font-bold text-lg leading-none">
          ×
        </button>
      </div>

      {/* Modal konfirmasi */}
      <ConfirmModal
        isOpen={isModalOpen && selectedProduct === null}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}