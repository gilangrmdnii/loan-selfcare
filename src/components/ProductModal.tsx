'use client'

import { Product } from '@/types/ProductType'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const router = useRouter()
    const [showDescription, setShowDescription] = useState(true)
    const [showTerms, setShowTerms] = useState(false)

    if (!isOpen || !product) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end md:items-center px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="bg-white rounded-t-2xl w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="relative p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">PROMO</span>
                            <h2 className="text-base font-bold text-[#0F1B60] mt-2">{product.name}</h2>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-red-600 text-2xl font-bold">{product.promoPrice ?? product.price}</span>
                                {product.promoPrice && (
                                    <span className="text-gray-400 line-through text-sm">{product.price}</span>
                                )}
                            </div>
                            <div className="mt-2 text-[11px] text-gray-500 border border-gray-200 rounded-full px-2 py-[2px] inline-block">
                                {product.duration} validity
                            </div>
                        </div>
                        <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">✕</button>
                    </div>
                </div>

                <hr className="border-gray-200" />

                {/* Kuota */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        🌐
                        <span className="text-sm font-medium text-[#0F1B60]">Internet</span>
                    </div>
                    <span className="text-sm font-semibold">{product.quota}</span>
                </div>

                <hr className="border-gray-200" />

                {/* Deskripsi */}
                <div className="px-6 py-4">
                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="flex items-center justify-between w-full font-bold text-[#0F1B60]"
                    >
                        Deskripsi
                        <span>{showDescription ? '▲' : '▼'}</span>
                    </button>
                    {showDescription && (
                       <p
                        className="text-sm text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    )}
                </div>

                <hr className="border-gray-200" />

                {/* Syarat */}
                <div className="px-6 py-4">
                    <button
                        onClick={() => setShowTerms(!showTerms)}
                        className="flex items-center justify-between w-full font-bold text-[#0F1B60]"
                    >
                        Syarat dan Ketentuan
                        <span>{showTerms ? '▲' : '▼'}</span>
                    </button>
                    {showTerms && (
                        <p className="text-sm text-gray-700 mt-2">
                            Silakan isi dengan teks syarat dan ketentuan di sini.
                        </p>
                    )}
                </div>

                <hr className="border-gray-200" />

                {/* Harga Total */}
                <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-sm text-[#0F1B60] font-medium">Harga Total</span>
                    <span className="text-sm font-bold text-[#0F1B60]">
                        Rp{product.promoPrice?.toLocaleString('id-ID') ?? product.price?.toLocaleString('id-ID')}
                    </span>
                </div>

                {/* CTA Button */}
                <div className="px-6 pb-6">
                    <button
                        onClick={() => {
                            if (product) {
                                // Simpan ke localStorage
                                localStorage.setItem('selectedProduct', JSON.stringify(product))
                            }

                            onClose()
                            router.push('/payment-loan')
                        }}
                        className="w-full bg-red-600 text-white font-semibold py-3 rounded-full text-center text-sm"
                    >
                        Aktifkan Sekarang
                    </button>
                </div>

            </div>
        </div>
    )
}