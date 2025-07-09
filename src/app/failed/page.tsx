'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FailedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-12 text-center text-[#0F1B60]">
      {/* Logo Telkomsel */}
      <Image
        src="/assets/logo/Telkomsel-Logo.png"
        alt="Telkomsel"
        width={120}
        height={40}
        className="mb-6"
      />

      {/* Ilustrasi Gagal */}
      <Image
        src="/assets/images/success_human.png" // Pastikan file ini ada di public/assets/images
        alt="Failed"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Judul */}
      <h1 className="text-base font-bold text-red-600">Transaksi Gagal</h1>
      <p className="text-sm mt-1 px-6 text-gray-500">
        Maaf, terjadi kesalahan saat memproses pinjaman Anda.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Silakan coba kembali atau hubungi pusat bantuan untuk bantuan lebih lanjut.
      </p>

      {/* Tombol Coba Lagi */}
      <button
        onClick={() => router.push('/')}
        className="w-full max-w-md bg-red-600 text-white py-3 mt-8 rounded-full font-semibold text-sm"
      >
        Beranda
      </button>

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-4 px-6 text-center">
        Jika masalah terus terjadi, silakan hubungi{' '}
        <span className="text-blue-600 font-semibold underline cursor-pointer">
          Pusat Bantuan
        </span>
      </div>
    </div>
  )
}
