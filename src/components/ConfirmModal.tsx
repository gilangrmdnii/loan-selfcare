'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { initiateUpp } from '@/features/initiateUpp/initiateUppSlice'
import { useEffect, useState } from 'react'
import { fetchEmergencyLoan } from '@/features/emergencyLoan/emergencyLoanSlice'

export default function ConfirmModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { outstanding } = useAppSelector((state) => state.loanHistory)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        dispatch(fetchEmergencyLoan())
    }, [dispatch])

    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            setError(null)
        }, 10000)

        return () => clearTimeout(timer)
    }, [error])
    
    if (!isOpen) return null

    const handleUpp = async () => {
        setError(null)
        setLoading(true)

        try {
            const resultAction = await dispatch(
            initiateUpp({
                channel: 'i1',
                amount: outstanding ?? 0,
            })
            )

            if (initiateUpp.fulfilled.match(resultAction)) {
                const { redirectUrl } = resultAction.payload as { redirectUrl: string }
                router.push(redirectUrl)
                onClose()
            } else {
                setError(resultAction.payload as string || 'Gagal memuat halaman')
            }
        }  catch (e) {
            setError('Terjadi kesalahan saat memproses pembayaran.')
        } finally {
            setLoading(false)
        }
    }

    const handleTopup = () => {
        window.location.href = process.env.NEXT_PUBLIC_TOPUP_URL ?? "";
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end md:items-center px-4"
            onClick={(e) => {
                // if (e.target === e.currentTarget && !loading) onClose()
            }}
        >
            <div className="bg-white rounded-t-2xl w-full max-w-md p-6 shadow-lg">

                {/* Close Button */}
                <div className="flex justify-end mb-2">
                    <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">
                        ✕
                    </button>
                </div>

                {error && (
                    <p className="mb-4 text-sm text-red-600 font-semibold pb-4">
                        {error}
                    </p>
                )}

                {/* Info Section */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Prabayar {localStorage.getItem("msisdn")}</p>
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-[#0F1B60]">Tagihan Anda</h2>
                        <span className="text-red-600 font-bold text-lg">
                            Rp{outstanding?.toLocaleString('id-ID') || '0'}
                        </span>
                    </div>
                </div>

                {/* Divider & Label */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-200" />
                    <span className="mx-2 text-gray-400 text-sm">Opsi Pembayaran</span>
                    <div className="flex-grow border-t border-gray-200" />
                </div>

                {/* Buttons */}
                <div className="space-y-3 pb-3">
                    <button
                        onClick={handleTopup}
                        className="w-full border bg-red-500 text-white font-semibold py-3 rounded-full"
                    >
                        {'Top up Pulsa'}
                    </button>
                </div>
                <div className="space-y-3">
                    <button
                        disabled={loading}
                        onClick={handleUpp}
                        className="w-full border border-red-500 text-red-600 font-semibold py-3 rounded-full"
                    >
                        {loading ? 'Loading...' : 'Bayar Tagihan via E-Wallet'}
                    </button>
                </div>
            </div>
        </div>
    )
}
