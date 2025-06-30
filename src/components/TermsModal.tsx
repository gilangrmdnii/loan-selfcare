'use client'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
          <h2 className="text-base font-semibold text-[#0F1B60]">Syarat dan Ketentuan</h2>
          <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">✕</button>
        </div>
        <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-2">
          <li>
            Saldo Darurat adalah saldo monetary voucher yang dapat digunakan untuk membeli layanan internet, telepon, dan SMS (dalam bentuk paket) serta membeli layanan digital seperti layanan video, musik, dan games. Saldo Darurat tidak bisa digunakan untuk layanan telepon, SMS, dan internet tanpa paket (PAYU/Pay as You Use).
          </li>
          <li>
            Saldo Darurat dapat diaktifkan tanpa memotong pulsa di awal.
          </li>
          <li>
            Harga yang tercantum sudah termasuk PPN.
          </li>
          <li>
            Pembayaran dapat dilakukan nanti. Pulsa akan otomatis dipotong sesuai harga Saldo Darurat setelah:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Melakukan pengisian pulsa.</li>
              <li>Menerima transfer pulsa.</li>
              <li>Masa aktif paket habis.</li>
              <li>Melakukan pembayaran mandiri melalui UMB *505#.</li>
            </ul>
          </li>
          <li>
            Setelah diaktifkan, Anda akan mendapat Saldo Darurat senilai paket yang ditawarkan.
          </li>
          <li>
            Pembelian produk menggunakan Saldo Darurat tidak dikenakan biaya jika pelanggan memiliki nominal pulsa lebih atau sedang dalam masa tenggang.
          </li>
        </ol>
      </div>
    </div>
  )
}
