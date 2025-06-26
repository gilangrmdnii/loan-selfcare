export default function EmergencyPackages() {
    return (
        <div className="mt-6">
            <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">Paket Darurat Untukmu</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4 relative flex items-start justify-between">
                {/* Badge Promo */}
                <div className="absolute top-0 left-0">
                    <div className="bg-gradient-to-r from-red-600 to-red-400 text-white text-xs font-semibold px-2 py-[2px] rounded-tl-2xl rounded-br-2xl">
                        Promo
                    </div>
                </div>

                {/* Info Paket */}
                <div className="mt-2">
                    <div className="text-sm font-semibold text-[#0F1B60]">Paket Darurat 10rb</div>
                    <div className="text-sm font-bold">
                        750 MB <span className="text-gray-400 font-normal ml-1">2 Hari</span>
                    </div>
                </div>

                {/* Harga */}
                <div className="text-right mt-2">
                    <div className="text-sm text-gray-400 line-through">Rp10.000</div>
                    <div className="text-sm font-bold text-[#0F1B60]">Rp7.000</div>
                </div>
            </div>
            <div className="mt-4 bg-gray-50 rounded-lg p-4 relative flex items-start justify-between">
                {/* Info Paket */}
                <div>
                    <div className="text-sm font-semibold text-[#0F1B60]">Paket Darurat 20rb</div>
                    <div className="text-sm font-bold">
                        1 GB <span className="text-gray-400 font-normal ml-1">2 Hari</span>
                    </div>
                </div>

                {/* Harga */}
                <div className="text-right mt-2">
                    <div className="text-sm font-bold text-[#0F1B60]">Rp20.000</div>
                </div>
            </div>
            <div className="mt-4 bg-gray-50 rounded-lg p-4 relative flex items-start justify-between">
                {/* Info Paket */}
                <div >
                    <div className="text-sm font-semibold text-[#0F1B60]">Paket Darurat 30rb</div>
                    <div className="text-sm font-bold">
                        2 GB <span className="text-gray-400 font-normal ml-1">2 Hari</span>
                    </div>
                </div>

                {/* Harga */}
                <div className="text-right mt-2">
                    <div className="text-sm font-bold text-[#0F1B60]">Rp30.000</div>
                </div>
            </div>
        </div>
    )
}
