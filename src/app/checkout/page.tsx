'use client'

import CheckoutHeader from '@/components/CheckoutHeader'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function CheckoutPage() {
    const [email,] = useState('johnsmith@gmail.com')
      const router = useRouter()


    return (
        <>
            <CheckoutHeader />
            <div className="min-h-screen bg-white text-[#0F1B60] px-4 py-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Email Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-6">
                        <div>
                            <h1 className="text-xl font-bold text-[#0F1B60] mb-2">Konfirmasi</h1>
                            <div>
                                <label className="text-xs font-semibold text-[#0F1B60] block">Email Penerima</label>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-sm text-gray-700">{email}</span>
                                    <button className="text-blue-600 text-sm" aria-label="Edit Email">
                                        ✎
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="text-right text-xs text-gray-600 leading-tight">
                                <div className="font-medium">Selesaikan Pembayaran</div>
                                <div>Anda dalam tepat waktu</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">59</div>
                                <span className="text-sm text-[#0F1B60] font-semibold">:</span>
                                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">59</div>
                                <div className="ml-2 flex gap-1 text-[10px] text-gray-500 font-medium">
                                    <span>Menit</span>
                                    <span>Detik</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Kiri */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Box Pesanan */}
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
                                <p className="text-xs text-gray-500 font-medium mb-1">T-Shop</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/assets/images/tagihan.png"
                                        alt="Tagihan"
                                        className="w-16 h-16 rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-[#0F1B60]">Tagihan Paket Darurat</p>
                                        <p className="text-xs text-gray-500">Kuantitas: 1</p>
                                        <p className="text-sm font-bold mt-1 text-[#0F1B60]">Rp12.000</p>
                                    </div>
                                </div>
                            </div>

                            {/* Opsi Tambahan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Top Up Pulsa', price: 5000, icon: '/assets/logo/ico_pulsa.png' },
                                    { label: 'Kuota Ketengan 5GB', price: 15000, icon: '/assets/logo/ico_left.png' },
                                ].map((item, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between hover:border-red-600 transition">
                                        <div className="flex items-center gap-2">
                                            <img src={item.icon} className="w-5 h-5" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#0F1B60]">{item.label}</p>
                                                <p className="text-sm text-red-600 font-bold">Rp{item.price.toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kanan: Ringkasan */}
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                            <h3 className="text-sm font-bold text-[#0F1B60] mb-3">Ringkasan</h3>
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="text-[#0F1B60] font-medium">Total Harga (1 Barang)</span>
                                <span className="text-red-600 font-bold">Rp12.000</span>
                            </div>
                            <button className="text-xs text-blue-600 font-medium underline mb-4">Lihat Detail</button>

                            {[
                                {
                                    text: 'Donasi Rp4.000',
                                    icon: '/assets/logo/ico_handheart.png',
                                },
                                {
                                    text: 'Bulatkan dengan kuota 2GB untuk 1 Hari',
                                    icon: '/assets/logo/ico_left.png',
                                },
                            ].map((item, i) => (
                                <label
                                    key={i}
                                    className="flex bg-white items-center justify-between px-3 py-2 border border-gray-200 rounded-lg mb-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={item.icon} alt="icon" className="w-4 h-4" />
                                        <span className="text-sm text-[#0F1B60]">{item.text}</span>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                                </label>
                            ))}


                            {/* Voucher */}
                            <div className="flex justify-between items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#FFF3F3] text-red-600 font-semibold text-sm cursor-pointer">
                                <span>5 Voucher Tersedia</span>
                                <span className="text-lg">➔</span>
                            </div>

                            {/* Agreement */}
                            <div className="flex items-start mt-4 text-xs text-gray-500">
                                <input type="checkbox" className="mt-1 mr-2 w-4 h-4" />
                                <span>
                                    Saya telah menyetujui{' '}
                                    <span className="text-blue-600 underline">Kebijakan Privasi</span> dan{' '}
                                    <span className="text-blue-600 underline">S&K</span> Telkomsel untuk melanjutkan transaksi.
                                </span>
                            </div>

                            <button
                                onClick={() => router.push('/payment-method')}
                                className="mt-4 w-full bg-red-600 text-white font-bold rounded-full py-3 text-sm hover:bg-red-700 transition">
                                Pilih Metode Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
