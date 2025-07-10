'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { initiateUpp } from '@/features/initiateUpp/initiateUppSlice'

export default function ConfirmModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { msisdn, amount } = useAppSelector((state) => state.emergencyLoan)

    if (!isOpen) return null

    const handleUpp = async () => {
        onClose()

        const resultAction = await dispatch(
            initiateUpp({
                offerId: '00021523',
                subscribe: false,
                version: 'v2',
                campaignOffer: false,
                campaignId: 'CPGGL1234567890',
                campaignTrackingId: 'CPGGL1234567890',
            })
        )

        if (initiateUpp.fulfilled.match(resultAction)) {
            const { redirectUrl } = resultAction.payload as { redirectUrl: string }
            router.push(redirectUrl) 
        } else {
            console.error('Gagal redirect: ', resultAction.payload)
        }
    }

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
                    <p className="text-sm text-gray-500">Prabayar {localStorage.getItem("msisdn")}</p>
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-[#0F1B60]">Tagihan Anda</h2>
                        <span className="text-red-600 font-bold text-lg">
                            Rp{amount?.toLocaleString('id-ID') || '0'}
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
                        onClick={handleUpp}
                        className="w-full border border-red-500 text-red-600 font-semibold py-3 rounded-full"
                    >
                        Bayar Tagihan via E-Wallet
                    </button>
                </div>
            </div>
        </div>
    )
}
