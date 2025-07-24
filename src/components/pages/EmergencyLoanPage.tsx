'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'

// Komponen UI
import Header from '@/components/Header'
import BillCard from '@/components/BillCard'
import EmergencyTabs from '@/components/EmergencyTabs'
import EmergencyVideo from '@/components/EmergencyVideo'
import EmergencyInfo from '@/components/EmergencyInfo'
import EmergencyPackages from '@/components/EmergencyPackages'
import EmergencyBalance from '@/components/EmergencyBalance'
import TermsModal from '@/components/TermsModal'
import TermsEmergencyModal from '../TermsEmergencyModal'
import ConfirmModal from '@/components/ConfirmModal'
import ProductModal from '@/components/ProductModal'

import { Product } from '@/types/ProductType'
import { getTokenFromSearchOrCookie } from '@/utils/token'
import { fetchLoanHistory } from '@/features/loanHistory/loanHistorySlice'
import { useAppSelector } from '@/store/hooks'

export default function EmergencyLoanPage() {
  const isPayment = process.env.NEXT_PUBLIC_PAYMENT
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const raw = searchParams.get('custParam')
  // State untuk modal dan tab
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showTermsEmergencyModal, setShowTermsEmergencyModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'paket' | 'saldo'>('paket')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const {
    outstanding,
    loading,
  } = useAppSelector((state) => state.loanHistory)

  getTokenFromSearchOrCookie(raw)

  useEffect(() => {
    const token = getTokenFromSearchOrCookie(raw)
    if (token) {
      dispatch(fetchLoanHistory(token))
    }
  }, [raw, dispatch])

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-screen-sm px-4 pb-20">
        <Header />
        <BillCard />

        {/* Tombol bayar tagihan */}
        {isPayment === "true" && outstanding !== null && outstanding > 0 && (
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-4"
            >
              Bayar Tagihan
            </button>
          </div>
        )}


        {/* Tab navigasi */}
        <EmergencyTabs active={activeTab} onTabChange={setActiveTab} />

        {/* Konten berdasarkan tab */}
        {activeTab === 'paket' ? (
          <>
            <EmergencyVideo />
            <EmergencyInfo
              onOpenTerms={() => setShowTermsModal(true)}
              onOpenEmergencyTerms={() => setShowTermsEmergencyModal(true)}
            />
            <EmergencyPackages onSelect={handleSelectProduct} />
          </>
        ) : (
          <EmergencyBalance />
        )}

        {/* Modal produk */}
        <ProductModal
          isOpen={isModalOpen && selectedProduct !== null}
          onClose={() => {
            setModalOpen(false)
            setSelectedProduct(null)
          }}
          product={selectedProduct}
        />

        {/* Modal konfirmasi */}
        <ConfirmModal
          isOpen={isModalOpen && selectedProduct === null}
          onClose={() => setModalOpen(false)}
        />

        {/* Modal syarat & ketentuan */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />

        <TermsEmergencyModal
          isOpen={showTermsEmergencyModal}
          onClose={() => setShowTermsEmergencyModal(false)}
        />
      </div>
    </div>
  )
}