'use client'

interface TermsEmergencyModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function TermsEmergencyModal({ isOpen, onClose }: TermsEmergencyModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="bg-white rounded-t-2xl md:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-full">
                        <h2 className="text-base font-semibold text-[#0F1B60] text-center">
                            Cara Bayar Paket Darurat
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">✕</button>
                </div>
                <h2 className="text-sm mb-2">Pembayaran bisa dilakukan melalui:</h2>
                <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-2">
                    <li>Isi ulang pulsa, pulsa pelanggan akan terpotong otomatis sesuai dengan jumlah tagihan.</li>
                    <li>Menerima transfer pulsa, pulsa pelanggan akan terpotong otomatis sesuai dengan jumlah tagihan*.</li>
                    <li>Saat masa aktif Paket Darurat telah habis, pulsa pelanggan akan terpotong otomatis sesuai dengan jumlah tagihan*.</li>
                    <li>Akses UMB *505# lalu pilih menu “Cek Tagihan”, lalu pilih menu “Bayar”.</li>
                    <li>Jika pulsa habis, Anda dapat membayarnya menggunakan metode pembayaran yang tersedia.</li>
                </ol>
            </div>
        </div>
    )
}
