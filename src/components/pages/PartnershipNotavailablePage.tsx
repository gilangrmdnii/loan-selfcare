"use client";

import Header from "@/components/Header";

export default function PartnershipNotavailablePage() {

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-screen-sm px-4 pb-20">
        <Header />

        <div className="mt-8 text-center mt-40">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-30 h-30 flex items-center justify-center">
                <img src="/assets/images/Illustration.png" alt="icob" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Anda tidak memiliki tagihan paket darurat
          </h2>
        </div>
      </div>
    </div>
  );
}