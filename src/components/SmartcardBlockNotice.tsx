'use client'

import { useState, useEffect } from "react"

type SmartcardProps = {
    blockDate?: string // format ISO string
    isBlocked: boolean
    onPay: () => void
}

export default function SmartcardBlockNotice({ blockDate, isBlocked, onPay }: SmartcardProps) {
    const [dismissed, setDismissed] = useState(false)

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

    // if (dismissed) return null

    const message = isBlocked
        ? "Akses Internet Anda diblokir. Lunasi tagihan untuk aktifkan kembali."
        : blockDate
            ? (() => {
                const block = new Date(blockDate)
                const today = new Date()
                block.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)
                const diffDays = Math.ceil((block.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                return `⚠️ Segera bayar tagihan, Akses internet Anda akan diblokir ${diffDays} hari lagi`
            })()
            : ""

    return (
        <div className="bg-[#FDA22B] text-sm px-4 py-3 font-medium flex items-center justify-between">
            <p className="text-black flex-1">
                {message}
            </p>
            <div className="flex items-center gap-2 ml-4">
                <button
                    onClick={onPay}
                    className="text-black font-bold"
                >
                    BAYAR
                </button>
                {/* <button onClick={handleDismiss} className="text-black font-bold text-lg leading-none">
          ×
        </button> */}
            </div>
        </div>
    )
}
