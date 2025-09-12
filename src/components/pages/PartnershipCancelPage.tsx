"use client";

import Header from "@/components/Header";

export default function PartnershipCancelPage() {

  const handleCancel = async () => {
    window.location.href = process.env.NEXT_PUBLIC_TOPUP_URL ?? "";
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-screen-sm px-4 pb-20">
        <Header />

        <div className="mt-8 text-center mt-40">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-30 h-30 flex items-center justify-center">
                <img src="/assets/images/icon-darurat.svg" alt="icob" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Response pembatalan membayaran anda telah kami simpan
          </h2>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-xl p-4">
          
          <button className="w-full bg-red-600 text-white font-semibold py-3 mt-4 rounded-[30px]" onClick={handleCancel}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}