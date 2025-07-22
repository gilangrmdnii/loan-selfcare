interface EmergencyInfoProps {
    onOpenTerms: () => void
    onOpenEmergencyTerms: () => void
}

export default function EmergencyInfo({ onOpenTerms, onOpenEmergencyTerms }: EmergencyInfoProps) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Paket Darurat</h3>
            <p className="text-gray-700 mt-1 text-sm">
                Paket internet, telepon, atau SMS yang bisa diaktifkan dan dibayar nanti ketika sudah mengisi pulsa.
            </p>
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={onOpenEmergencyTerms}
                    className="flex-1 border border-gray-300 rounded-2xl py-2 px-4 text-sm font-medium flex items-center justify-start gap-2 text-left"
                >
                    <img src="/assets/logo/ico_wallet.png" alt="Dompet" className="w-5 h-5" />
                    <span className="block">Cara Bayar Paket Darurat</span>
                </button>
                <button
                    onClick={onOpenTerms}
                    className="flex-1 border border-gray-300 rounded-2xl py-2 px-4 text-sm font-medium flex items-center justify-start gap-2 text-left"
                >
                    <img src="/assets/logo/ico_help.png" alt="Bantuan" className="w-5 h-5" />
                    <span className="block">Syarat & Ketentuan</span>
                </button>
            </div>
        </div>
    )
}
