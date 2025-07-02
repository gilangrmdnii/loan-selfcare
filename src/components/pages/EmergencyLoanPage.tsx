'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { fetchEmergencyLoan } from '@/features/emergencyLoan/emergencyLoanSlice'

// Komponen UI
import Header from '@/components/Header'
import BillCard from '@/components/BillCard'
import EmergencyTabs from '@/components/EmergencyTabs'
import EmergencyVideo from '@/components/EmergencyVideo'
import EmergencyInfo from '@/components/EmergencyInfo'
import EmergencyPackages from '@/components/EmergencyPackages'
import EmergencyBalance from '@/components/EmergencyBalance'
import TermsModal from '@/components/TermsModal'
import ConfirmModal from '@/components/ConfirmModal'
import ProductModal from '@/components/ProductModal'
import { Product } from '@/types/ProductType'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '@/store'

export default function EmergencyLoanPage() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const raw = searchParams.get('custParam')
  const token = raw?.replace(/^<|>$/g, '')

  const [showTermsModal, setShowTermsModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'paket' | 'saldo'>('paket')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { eligible, hasPaid } = useAppSelector((state) => state.emergencyLoan)


  useEffect(() => {
    if (token) {
      dispatch(fetchEmergencyLoan(token))
    }
  }, [dispatch, token])

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
        {eligible && !hasPaid && (
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-4"
          >
            Bayar Tagihan
          </button>
        )}
        {/* Informasi saldo */}
        <EmergencyVideo />

        {/* Informasi darurat */}
        <EmergencyInfo onOpenTerms={() => setShowTermsModal(true)} />

        {/* Konten berdasarkan tab */}
        {activeTab === 'paket' ? (
          eligible ? (
            <>
              <EmergencyTabs active={activeTab} onTabChange={setActiveTab} />
              <EmergencyPackages onSelect={handleSelectProduct} />
            </>
          ) : (
            <p className="mt-6 text-sm text-center text-gray-500">
            </p>
          )
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
      </div>
    </div>
  )
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

