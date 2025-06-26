'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OTPModal({
  isOpen,
  onClose,
  phoneNumber,
}: {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
}) {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(300)

  useEffect(() => {
    if (isOpen) {
      setTimer(300) // 5 menit
      setOtp(['', '', '', '', '', ''])
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen])

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    // Auto-focus to next input (optional)
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name=otp-${index + 1}]`
      )
      nextInput?.focus()
    }
  }

  const handleSubmit = () => {
    const fullOtp = otp.join('')
    if (fullOtp.length === 6) {
      // Jika ingin validasi OTP ke API, letakkan di sini
      router.push('/bill-payment') // ganti sesuai rute halaman pembayaran kamu
    }
  }

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center md:items-center md:justify-center">
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-sm mx-4 transform transition-all ${
          window.innerWidth < 768 ? 'fixed bottom-0 rounded-b-none' : 'relative'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Verifikasi OTP</h3>
          <button onClick={onClose}>
            <span className="text-xl">&times;</span>
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Masukan OTP yang telah dikirimkan ke <br />
          <span className="font-medium">{phoneNumber}</span>
        </p>

        {/* Input OTP */}
        <div className="flex justify-center gap-2 mt-4">
          {otp.map((val, i) => (
            <input
              key={i}
              name={`otp-${i}`}
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-10 h-10 border border-gray-300 rounded text-center text-lg"
            />
          ))}
        </div>

        {/* Tombol Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white rounded-full py-2 mt-4 font-semibold"
        >
          Submit
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Berlaku hingga{' '}
          <span className="font-semibold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <br />
          Mohon menunggu untuk mengirim ulang OTP
        </p>
      </div>
    </div>
  )
}
