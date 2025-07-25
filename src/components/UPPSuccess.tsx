'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { purchaseOffer, selectPurchase } from '@/features/purchaseOffer/purchaseOfferSlice'
import { Product } from '@/types/ProductType'

export default function UPPSuccess() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { success, error, loading } = useAppSelector(selectPurchase)

    const [counter, setCounter] = useState(3)

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prev) => {
                if (prev === 0) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (counter === 0) {
            router.push('/')
        }
    }, [counter, router])

    return (
        <div>
            
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center text-[#0F1B60]">
                {/* Logo Telkomsel */}
                <Image
                    src="/assets/logo/Telkomsel-Logo.png"
                    alt="Telkomsel"
                    width={120}
                    height={40}
                    className="mb-20"
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
                <h1 className="text-lg font-bold">Pembayaran Sukses</h1>
                <p className="text-sm text-gray-500 mt-1">Anda akan diarahkan di proses selanjutnya secara otomatis dalam</p>
                <p className="text-sm text-red-600 font-bold mt-1">{counter} Detik</p>

                {/* Loader */}
                <div className="mt-6 mb-8">
                    <div className="w-12 h-12 rounded-full border-4 border-white border-t-red-500 animate-spin bg-gradient-to-br from-red-500 to-yellow-400 mx-auto" />
                </div>

                {/* Tombol Lanjutkan */}
                <button
                    onClick={() => router.push('/')}
                    className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-sm mb-4"
                    disabled={loading}
                >
                    Lanjutkan
                </button>
            </div>
        </div>
    )
}