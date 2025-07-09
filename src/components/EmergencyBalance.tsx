'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchEmergencyBalance } from '@/features/emergencyBalance/emergencyBalanceSlice'
import ProductModal from '@/components/ProductModal'
import TermsModal from '@/components/TermsModal'
import { Product } from '@/types/ProductType'

export default function EmergencyBalance() {
    const dispatch = useAppDispatch()

    const { balances, loading, error } = useAppSelector((state) => state.emergencyBalance)


    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const [showTermsModal, setShowTermsModal] = useState(false)

    useEffect(() => {
        dispatch(fetchEmergencyBalance())
    }, [dispatch])

    const handleClickProduct = (product: Product) => {
        setSelectedProduct(product)
        setModalOpen(true)
    }

    return (
        <div className="mt-6 space-y-6 text-[#0F1B60]">
            {/* Header Deskripsi */}
            <div>
                <h2 className="text-lg font-bold">Saldo Darurat</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Pulsa kurang saat beli layanan digital Telkomsel? Gak masalah! Aktifkan Saldo Darurat sekarang dan bayar nanti untuk lanjut menikmati berbagai layanan video, musik, dan games terbaik dari Telkomsel.
                </p>
                <div className="mt-2 text-sm">
                    <button
                        onClick={() => setShowTermsModal(true)}
                        className="text-blue-600 font-semibold underline mr-4"
                    >
                        Syarat & Ketentuan
                    </button>
                    <a href="#" className="text-blue-600 font-semibold underline">Cara Pembelian Dengan Saldo Darurat</a>
                </div>
            </div>

          

            {/* Divider */}
            <div className="flex items-center gap-4">
                <hr className="flex-grow border-gray-200" />
                <span className="text-sm font-medium text-gray-400">Beli Saldo Darurat</span>
                <hr className="flex-grow border-gray-200" />
            </div>

            {/* Loading, Error, & Product List */}
            {loading && <p className="text-center text-sm text-gray-500">Memuat saldo darurat...</p>}
            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <div className="space-y-3">
                {balances.map((item: Product, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleClickProduct(item)}
                        className="w-full text-left bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.duration}</p>
                            </div>
                            <div className="text-right">
                                {item.promoPrice && (
                                    <p className="text-sm text-gray-400 line-through">
                                        Rp{item.price.toLocaleString('id-ID')}
                                    </p>
                                )}
                                <p className="font-bold text-[#0F1B60]">
                                    Rp{(item.promoPrice ?? item.price).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Modal Product */}
            <ProductModal
                isOpen={isModalOpen && selectedProduct !== null}
                onClose={() => {
                    setModalOpen(false)
                    setSelectedProduct(null)
                }}
                product={selectedProduct}
            />

            {/* Modal Syarat & Ketentuan */}
            <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
        </div>
    )
}
