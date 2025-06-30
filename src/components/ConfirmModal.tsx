'use client'

import { useRouter } from 'next/navigation'

export default function ConfirmModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center px-4">
      <div className="bg-white rounded-t-lg md:rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-lg font-bold text-[#0F1B60] mb-2">Konfirmasi Pembayaran</h2>
        <p className="text-sm text-gray-600 mb-4">
          Kamu akan membayar <strong>Paket Darurat 10rb</strong> sebesar <span className="text-red-600 font-bold">Rp7.000</span>
        </p>

        <div className="grid gap-3 mt-4">
          <button
            onClick={() => {
              onClose()
              router.push('/payment-method?via=wallet')
            }}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-full"
          >
            Bayar dengan E-Wallet
          </button>
          <button
            onClick={() => {
              onClose()
              router.push('/payment-method?via=pulsa')
            }}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-full"
          >
            Bayar dengan Pulsa
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 underline"
        >
          Batal
        </button>
      </div>
    </div>
  )
}
