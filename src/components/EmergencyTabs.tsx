interface EmergencyTabsProps {
  active: 'paket' | 'saldo'
  onTabChange: (tab: 'paket' | 'saldo') => void
}

export default function EmergencyTabs({ active, onTabChange }: EmergencyTabsProps) {
  return (
    <div className="flex border-b mt-2 border-gray-200">
      <button
        onClick={() => onTabChange('paket')}
        className={`flex-1 py-2 font-semibold ${
          active === 'paket' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800'
        }`}
      >
        Paket Darurat
      </button>
      <button
        onClick={() => onTabChange('saldo')}
        className={`flex-1 py-2 font-semibold ${
          active === 'saldo' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-800'
        }`}
      >
        Saldo Darurat
      </button>
    </div>
  )
}
