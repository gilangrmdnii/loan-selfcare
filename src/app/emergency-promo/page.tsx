'use client'

// import EmergencyTabs from "@/components/EmergencyTabs"
import EmergencyForm from "@/components/EmergencyForm"
import EmergencyActions from "@/components/EmergencyActions"
// import EmergencyPackages from "@/components/EmergencyPackages"
import EmergencyFooter from "@/components/EmergencyFooter"
import EmergencyHeader from "@/components/EmergencyHeader"

export default function EmergencyPromoPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-screen-sm px-4 pb-10">
        <EmergencyHeader />
        {/* <EmergencyTabs active="paket" /> */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Paket Darurat</h3>
          <p className="text-sm text-gray-600 mt-1">
            Paket internet, telepon, atau SMS yang bisa diaktifkan dan dibayar nanti ketika sudah mengisi pulsa.
          </p>
        </div>
        <EmergencyForm />
        <EmergencyActions />
        {/* <EmergencyPackages /> */}
        <EmergencyFooter />
      </div>
    </div>
  )
}
