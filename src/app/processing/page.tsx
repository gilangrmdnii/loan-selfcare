'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProcessingPage() {
  const router = useRouter()
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    if (counter === 0) {
      router.push('/success') // Ganti ke halaman berikutnya
    }

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [counter, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center text-[#0F1B60]">
      {/* Logo Telkomsel */}
      <Image
        src="/assets/logo/Telkomsel-Logo.png" // Pastikan kamu punya logo ini
        alt="Telkomsel"
        width={120}
        height={40}
        className="mb-8"
      />

      {/* Ilustrasi */}
      <Image
        src="/assets/images/success_human.png" // Gambar karakter sesuai desain
        alt="Processing"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Status */}
      <h1 className="text-lg font-bold">Pinjaman sedang di proses</h1>
      <p className="text-sm text-gray-500 mt-1">Aktivasi paket sedang berlangsung</p>
      <p className="text-sm text-red-600 font-bold mt-1">{counter} Detik</p>

      {/* Loader */}
      <div className="mt-6 mb-8">
        <div className="w-12 h-12 rounded-full border-4 border-white border-t-red-500 animate-spin bg-gradient-to-br from-red-500 to-yellow-400 mx-auto" />
      </div>

      {/* Tombol Lanjutkan */}
      <button
        onClick={() => router.push('/success')}
        className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-sm mb-4"
      >
        Lanjutkan
      </button>

      {/* Email info */}
      <p className="text-xs text-gray-500">
        Faktur akan dikirim ke email <br />
        <span className="font-medium text-[#0F1B60]">johnsmith@gmail.com</span>
      </p>
    </div>
  )
}
