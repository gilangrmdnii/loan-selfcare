'use client'

import BillCard from "@/components/BillCard"
import EmergencyInfo from "@/components/EmergencyInfo"
import EmergencyTabs from "@/components/EmergencyTabs"
import EmergencyVideo from "@/components/EmergencyVideo"
import Header from "@/components/Header"
export default function EmergencyLoanPage() {
    return (
        <div className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-screen-sm px-4 pb-20">
                <Header />
                <BillCard />
                <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-4">
                    Bayar Tagihan
                </button>
                 <EmergencyTabs active="paket" />
                <EmergencyVideo />
                <EmergencyInfo />
            </div>
        </div>
    )
}

