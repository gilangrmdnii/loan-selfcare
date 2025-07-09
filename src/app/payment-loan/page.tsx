'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PaymentHeader from '@/components/PaymentHeader'
import { Product } from '@/types/ProductType'

interface Method {
    name: string
    description: string
    icon: string
}

export default function PaymentMethodPage() {
    const router = useRouter()
    const [selected, setSelected] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState(5 * 60)
    const [product, setProduct] = useState<Product | null>(null)

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

    const totalPrice = product ? (product.promoPrice ?? product.price) : 0

    const paymentMethods: Method[] = [
        {
            name: 'Pinjaman Paket ( tanpa biaya )',
            description: 'Saat isi ulang, pulsa kamu akan dipotong otomatis sesuai harga. S&K berlaku',
            icon: '/assets/payment/telkomsel.png'
        },
    ]

    useEffect(() => {
        if (!timeLeft) return
        const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearInterval(id)
    }, [timeLeft])

    const m = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const s = String(timeLeft % 60).padStart(2, '0')

    const handlePay = () => {
        if (!selected) return
        router.push(`/processing?method=${selected}`)
    }

    return (
        <>
            <PaymentHeader />

            <div className="min-h-screen bg-white px-4 pb-24 max-w-[520px] mx-auto">
                {/* Tombol kembali */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-[#0F1B60] mb-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </button>

                {/* Timer */}
                <div className="flex items-start justify-between gap-4">
                    <p className="text-[13px] leading-tight text-gray-600">
                        Selesaikan Pembayaran<br />Anda dalam tepat waktu
                    </p>

                    <div className="flex items-end gap-2">
                        <div className="flex flex-col items-center">
                            <span className="bg-[#EF3026] text-white text-[15px] font-bold leading-none px-3 py-1 rounded">
                                {m}
                            </span>
                            <span className="text-[11px] font-medium text-[#0F1B60] mt-1">Menit</span>
                        </div>
                        <span className="text-[#0F1B60] font-bold">:</span>
                        <div className="flex flex-col items-center">
                            <span className="bg-[#EF3026] text-white text-[15px] font-bold leading-none px-3 py-1 rounded">
                                {s}
                            </span>
                            <span className="text-[11px] font-medium text-[#0F1B60] mt-1">Detik</span>
                        </div>
                    </div>
                </div>

                <hr className="mt-4 mb-3 border-t border-[#E7EAF3]" />

                <h1 className="mt-6 text-lg font-bold text-[#0F1B60]">Pilih Metode Pembayaran</h1>

                <div className="mt-3 divide-y divide-[#E7EAF3]">
                    {paymentMethods.map((m) => (
                        <label key={m.name} className="flex items-start gap-4 py-4 cursor-pointer">
                            <Image src={m.icon} alt={m.name} width={28} height={28} />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-[#0F1B60]">{m.name}</p>
                                <p className="text-[11px] text-gray-500">{m.description}</p>
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                className="h-[18px] w-[18px] appearance-none rounded-full border border-[#B0B7C3]
                 checked:border-[6px] checked:border-[#0F1B60] transition"
                                checked={selected === m.name}
                                onChange={() => setSelected(m.name)}
                            />
                        </label>
                    ))}
                </div>

                {/* Total Harga */}
                <div className="mt-6 flex items-center justify-between px-5 py-3 border border-[#E7EAF3] rounded-md">
                    <button type="button" className="flex items-center gap-1 text-sm font-semibold">
                        Total Harga
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <span className="text-sm font-bold text-[#EF3026]">
                        Rp{totalPrice.toLocaleString('id-ID')}
                    </span>
                </div>

                {/* Tombol Bayar */}
                <button
                    disabled={!selected}
                    onClick={handlePay}
                    className={`mt-6 w-full rounded-full py-3 text-sm font-bold transition ${selected
                            ? 'bg-[#EF3026] text-white hover:bg-[#d9271d]'
                            : 'bg-[#D3D8E1] text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Bayar
                </button>
            </div>
        </>
    )
}
