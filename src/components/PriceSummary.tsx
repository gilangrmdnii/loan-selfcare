export default function PriceSummary({ total }: { total: string }) {
  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-800">Total Harga (1 Barang)</span>
        <span className="text-lg font-bold text-red-600">{total}</span>
      </div>
      <div className="flex items-start text-xs mt-2 gap-2">
        <input type="checkbox" className="mt-[2px]" />
        <p>
          Saya telah menyetujui <span className="text-blue-600 font-medium">Kebijakan Privasi</span> dan{' '}
          <span className="text-blue-600 font-medium">S&K</span> Telkomsel untuk melanjutkan transaksi.
        </p>
      </div>
    </div>
  )
}
