'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'

export default function LoanHistoryPage() {
    const [activeTab, setActiveTab] = useState<'pinjaman' | 'pembayaran'>('pinjaman')
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            {/* Header */}
            <div className="w-full max-w-screen-sm mx-auto px-4 pt-4">
                <Header />
                {/* tombol kembali */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-[#0F1B60] mb-4 mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </button>
                <h1 className="sr-only">Riwayat Pinjaman</h1>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('pinjaman')}
                        className={`flex-1 py-2 font-semibold text-sm ${activeTab === 'pinjaman' ? 'text-red-600 border-b-2 border-red-600' : 'text-[#0F1B60]'
                            }`}
                    >
                        Pinjaman
                    </button>
                    <button
                        onClick={() => setActiveTab('pembayaran')}
                        className={`flex-1 py-2 font-semibold text-sm ${activeTab === 'pembayaran' ? 'text-red-600 border-b-2 border-red-600' : 'text-[#0F1B60]'
                            }`}
                    >
                        Pembayaran
                    </button>
                </div>

                {/* Empty State */}
                {activeTab === 'pinjaman' && (
                    <div className="text-center mt-12">
                        <Image
                            src="/assets/images/Illustration.png"
                            alt="Empty Loan"
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                        <p className="mt-6 text-sm font-semibold text-[#0F1B60]">Belum Ada Riwayat Pinjaman</p>
                    </div>
                )}

                {activeTab === 'pembayaran' && (
                    <div className="text-center mt-12">
                        <Image
                            src="/assets/images/Illustration.png"
                            alt="Empty Payment"
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                        <p className="mt-6 text-sm font-semibold text-[#0F1B60]">Belum Ada Riwayat Pembayaran</p>
                    </div>
                )}
            </div>

            {/* CTA Button */}
            <div className="px-4 py-5 border-t border-gray-100 w-full max-w-screen-sm mx-auto">
                <button
                    onClick={() => router.push('/emergency')}
                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-full text-sm"
                >
                    Pilih Paket Darurat
                </button>
            </div>
        </div>
    )
}
