'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types/ProductType'
import { useEffect, useState } from 'react'

export default function SuccessPage() {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [msisdn, setMsisdn] = useState('')

   useEffect(() => {
          const stored = localStorage.getItem('selectedProduct')
          if (stored) {
              try {
                  setProduct(JSON.parse(stored))
              } catch (e) {
                  console.error('Gagal parse product dari localStorage', e)
              }
          }
   }, [])

    useEffect(() => { 
          const storedMsisdn = localStorage.getItem('msisdn') ?? ''
          setMsisdn(storedMsisdn)
     }, [])

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan mulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const formattedDated = formatDate(new Date());

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

      {/* Ilustrasi */}
      <Image
        src="/assets/images/success_human.png"
        alt="Success"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Judul */}
      <h1 className="text-base font-bold">Pinjaman Berhasil!</h1>
      <p className="text-sm mt-1 px-6">
        Paket akan aktif secara otomatis setelah pinjaman berhasil
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Cek SMS Notifikasi untuk informasi lebih lanjut
      </p>

      {/* Informasi Transaksi */}
      <div className="w-full text-left text-sm mt-6 space-y-3 max-w-md">
        <div className="flex justify-between border-b pb-1">
          <span className="text-gray-500">Order ID</span>
          <span className="font-semibold">{ product?.id ?? "-" }</span>
        </div>
        <div className="flex justify-between border-b pb-1">
          <span className="text-gray-500">Tanggal Order</span>
          <span className="font-semibold">{ formattedDated }</span>
        </div>
        <div className="border-b pb-2">
          <p className="text-gray-500">{ product?.name ?? "-" }</p>
          <p className="text-sm font-semibold">Rp { product?.price.toLocaleString('id-ID') ?? "-" }</p>
          <p className="text-sm text-gray-400 pt-1">{ msisdn }</p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">Rp { product?.price.toLocaleString('id-ID') ?? "-" }</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Biaya Layanan</span>
          <span className="font-semibold">Rp0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pajak</span>
          <span className="font-semibold">Rp0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Diskon</span>
          <span className="font-semibold">Rp0</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-[#0F1B60]">
          <span>Total Pembayaran</span>
          <span>Rp { product?.price.toLocaleString('id-ID') ?? "-" }</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Metode Pembayaran</span>
          <span className="font-semibold">Pinjam</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status Transaksi</span>
          <span className="font-semibold">Pembayaran Diterima</span>
        </div>
      </div>

      {/* Tombol */}
      <button
        onClick={() => router.push('/')}
        className="w-full max-w-md bg-red-600 text-white py-3 mt-8 rounded-full font-semibold text-sm"
      >
        Ke Halaman Utama
      </button>

      {/* Footer */}
      <div className="text-xs text-gray-500 mt-4 px-6 text-center">
        Faktur akan dikirim melalui email jika Anda memasukkan alamat email
        <br />
        <span className="block mt-2">
          Mengalami masalah terkait transaksi ini?
          <br />
          Hubungi{' '}
          <span className="text-blue-600 font-semibold underline cursor-pointer">
            Pusat Bantuan
          </span>
        </span>
      </div>
    </div>
  )
}
