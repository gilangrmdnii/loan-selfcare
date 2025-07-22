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
          <div className="w-full">
            <h2 className="text-base font-semibold text-[#0F1B60] text-center">
              Syarat dan Ketentuan
            </h2>
          </div>
          <button onClick={onClose} className="text-[#0F1B60] text-xl font-bold">✕</button>
        </div>
        <h2 className="text-sm mb-2">Berlaku untuk pelanggan Telkomsel PraBayar.</h2>
        <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-2">
          <li className="mb-2">
            Pelanggan telah aktif menggunakan kartu Telkomsel lebih dari 60 hari.
          </li>
          <li className="mb-2">
            Pelanggan tidak sedang memiliki Paket Darurat yang belum dikembalikan.
          </li>
          <li className="mb-2">
            Pelanggan wajib memenuhi kriteria frekuensi dan jumlah pengisian pulsa serta penggunaan rata-rata bulanan.
          </li>
          <li className="mb-2">
            Pelanggan yang melakukan isi ulang selain pulsa (misal paket data) maka tidak dapat dipotong untuk pembayaran Paket Darurat.
          </li>
          <li className="mb-2">
            Layanan ini hanya dapat diaktifkan di Indonesia.
          </li>
          <li className="mb-2">
            Skema dan periode masa aktif berlangganan mengikuti masing-masing layanan yang dikonfirmasi pada awal pembelian.
          </li>
          <li className="mb-2">
            Untuk keterangan lebih lanjut terkait layanan Paket Darurat Telkomsel, silakan menghubungi Customer Service 188.
          </li>
        </ol>
      </div>
    </div>
  )
}
