'use client'

import { useState } from 'react'
import OTPModal from './OTPModal' // pastikan path sesuai

export default function EmergencyForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showOtpModal, setShowOtpModal] = useState(false)

  const isFilled = phoneNumber.trim() !== ''

  return (
    <div className="mt-4">
      <h4 className="text-base font-bold text-gray-800">Bayar Tagihan</h4>

      <label className="block text-sm font-medium text-gray-800 mt-2">
        Nomor Telkomsel Prabayar
      </label>

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Masukkan nomor Telkomsel Prabayar"
        className="w-full border border-gray-200 rounded-lg p-3 mt-1 text-sm"
      />

      <button
        disabled={!isFilled}
        onClick={() => isFilled && setShowOtpModal(true)}
        className={`w-full py-3 rounded-lg mt-4 font-semibold transition-colors ${
          isFilled
            ? 'bg-red-600 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Lihat Tagihan
      </button>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        phoneNumber={phoneNumber}
      />
    </div>
  )
}
