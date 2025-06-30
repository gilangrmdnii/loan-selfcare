'use client'
import { useEffect } from 'react'
import { useAppDispatch, } from '@/store/hooks'
import { fetchEmergencyLoan } from '@/features/emergencyLoan/emergencyLoanSlice'
import { useState } from 'react'
import BillCard from "@/components/BillCard"
import EmergencyInfo from "@/components/EmergencyInfo"
import EmergencyTabs from "@/components/EmergencyTabs"
import EmergencyVideo from "@/components/EmergencyVideo"
import Header from "@/components/Header"
import ConfirmModal from '@/components/ConfirmModal'

export default function EmergencyLoanPage() {
    const [isModalOpen, setModalOpen] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchEmergencyLoan())
    }, [dispatch])


    return (
        <div className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-screen-sm px-4 pb-20">
                <Header />
                <BillCard />

                {/* Tombol trigger modal */}
                <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-4"
                >
                    Bayar Tagihan
                </button>

                <EmergencyTabs active="paket" />
                <EmergencyVideo />
                <EmergencyInfo />

                {/* Modal popup validasi */}
                <ConfirmModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>
        </div>
    )
}
