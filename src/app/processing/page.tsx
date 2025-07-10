'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { purchaseOffer, selectPurchase } from '@/features/purchaseOffer/purchaseOfferSlice'
import { Product } from '@/types/ProductType'

export default function ProcessingPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { success, error, loading } = useAppSelector(selectPurchase)

  const [counter, setCounter] = useState(3)

  // Ambil data dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedProduct')
    if (stored) {
    
    } else {
      alert('Tidak ada data produk yang dipilih.')
      router.push('/')
    }
  }, [dispatch, router])


  // Timer menuju halaman success
  useEffect(() => {
    if (counter === 0 && success) {
      router.push('/success')
    }

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [counter, success, router])

  // Jika gagal, tampilkan alert lalu redirect atau kembali
  useEffect(() => {
    if (error) {
      alert('Gagal melakukan pembelian: ' + error)
      router.push('/failed') // ⬅️ redirect ke halaman gagal
    }
  }, [error, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center text-[#0F1B60]">
      {/* Logo Telkomsel */}
      <Image
        src="/assets/logo/Telkomsel-Logo.png"
        alt="Telkomsel"
        width={120}
        height={40}
        className="mb-8"
      />

      {/* Ilustrasi */}
      <Image
        src="/assets/images/success_human.png"
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
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Lanjutkan'}
      </button>

      {/* Email info */}
      {/* <p className="text-xs text-gray-500">
        Faktur akan dikirim ke email <br />
        <span className="font-medium text-[#0F1B60]">johnsmith@gmail.com</span>
      </p> */}
    </div>
  )
}
