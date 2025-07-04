'use client'

import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'

export default function ConfirmModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const router = useRouter()
    const { msisdn, oustanding } = useAppSelector((state) => state.emergencyLoan)

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end md:items-center px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="bg-white rounded-t-2xl w-full max-w-md p-6 shadow-lg">
                {/* Close Button */}
                <div className="flex justify-end mb-2">
                    <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">
                        ✕
                    </button>
                </div>

                {/* Info Section */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Prabayar {msisdn || '-'}</p>
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-[#0F1B60]">Tagihan Anda</h2>
                        <span className="text-red-600 font-bold text-lg">
                            Rp{oustanding?.toLocaleString('id-ID') || '0'}
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
                <div className="space-y-3">
                    <button
                        onClick={() => {
                            onClose()
                            router.push('/payment-method?via=pulsa')
                        }}
                        className="w-full bg-red-600 text-white font-semibold py-3 rounded-full"
                    >
                        Top up Pulsa
                    </button>

                    <button
                        onClick={() => {
                            onClose()
                            router.push('/payment-method?via=wallet')
                        }}
                        className="w-full border border-red-500 text-red-600 font-semibold py-3 rounded-full"
                    >
                        Bayar Tagihan via E-Wallet
                    </button>
                </div>
            </div>
        </div>
    )
}
