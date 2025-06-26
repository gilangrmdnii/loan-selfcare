export default function EmergencyActions() {
  return (
    <div className="flex gap-2 mt-4">
      <button className="flex-1 border border-gray-200 rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-sm font-semibold">
        <img src="/assets/logo/ico_wallet.png" alt="Wallet" className="w-4 h-4" />
        Cara Bayar Paket Darurat
      </button>
      <button className="flex-1 border border-gray-200 rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-sm font-semibold">
        <img src="/assets/logo/ico_help.png" alt="Help" className="w-4 h-4" />
        Syarat & Ketentuan
      </button>
    </div>
  )
}
