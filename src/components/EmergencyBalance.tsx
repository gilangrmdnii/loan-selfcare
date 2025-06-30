'use client'

import { useState } from 'react'
import ProductModal from '@/components/ProductModal'
import { Product } from '@/types/ProductType'
import TermsModal from '@/components/TermsModal'


const dummyProducts: Product[] = [
    {
        name: 'Saldo Darurat 5Rb',
        quota: '5.000',
        duration: '2 Hari',
        price: 'Rp7.000',
        promoPrice: '',
        description: 'Saldo darurat sebesar 5rb untuk kebutuhan mendesak.',
    },
    {
        name: 'Saldo Darurat 10Rb',
        quota: '10.000',
        duration: '3 Hari',
        price: 'Rp14.000',
        promoPrice: '',
        description: 'Saldo darurat sebesar 10rb berlaku 3 hari.',
    },
    {
        name: 'Saldo Darurat 20Rb',
        quota: '20.000',
        duration: '3 Hari',
        price: 'Rp28.000',
        promoPrice: '',
        description: 'Saldo darurat sebesar 20rb berlaku 3 hari.',
    },
]

export default function EmergencyBalance() {
    const [phone] = useState('081234567890')
    const [currentBalance] = useState('Rp10.000')
    const [expiredDate] = useState('3 Jun 2025')

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const [showTermsModal, setShowTermsModal] = useState(false)

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

            {/* Info Saldo Aktif */}
            <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-500">Prabayar {phone}</p>
                <div className="flex justify-between items-center">
                    <p className="font-bold">Saldo Darurat</p>
                    <p className="text-red-600 font-bold">{currentBalance}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    Sebagian saldo akan kadaluarsa pada {expiredDate}
                </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
                <hr className="flex-grow border-gray-200" />
                <span className="text-sm font-medium text-gray-400">Beli Saldo Darurat</span>
                <hr className="flex-grow border-gray-200" />
            </div>

            {/* List Paket */}
            <div className="space-y-3">
                {dummyProducts.map((item, index) => (
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
                            <p className="font-bold text-[#0F1B60]">{item.price}</p>
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
