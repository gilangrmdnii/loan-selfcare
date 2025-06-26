type EmergencyTabsProps = {
  active: 'paket' | 'saldo'
}

export default function EmergencyTabs({ active }: EmergencyTabsProps) {
  return (
    <div className="flex border-b mt-2 border-gray-200">
      <button
        className={`flex-1 py-2 font-semibold ${active === 'paket' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800'}`}
      >
        Paket Darurat
      </button>
      <button
        className={`flex-1 py-2 font-semibold ${active === 'saldo' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800'}`}
      >
        Saldo Darurat
      </button>
    </div>
  )
}
