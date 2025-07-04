'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/ProductType'

interface Props {
  onSelect: (product: Product) => void
  msisdn: string
}

export default function EmergencyPackages({ onSelect, msisdn }: Props) {
  const [packages, setPackages] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/paket-darurat?msisdn=${msisdn}`)
        const data = await res.json()

        if (res.ok) {
          setPackages(data.offers)
        } else {
          setError(data.error || 'Gagal memuat paket')
        }
      } catch {
        setError('Terjadi kesalahan saat memuat data')
      } finally {
        setLoading(false)
      }
    }

    if (msisdn) fetchData()
  }, [msisdn])

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Paket Darurat Untukmu</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {loading && <p className="text-sm text-gray-500 text-center mt-4">Memuat paket...</p>}
      {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}

      {packages.map((pkg, idx) => (
        <div
          key={idx}
          className="mt-4 bg-gray-50 rounded-lg p-4 relative flex items-start justify-between cursor-pointer"
          onClick={() => onSelect(pkg)}
        >
          {pkg.promoPrice && (
            <div className="absolute top-0 left-0">
              <div className="bg-gradient-to-r from-red-600 to-red-400 text-white text-xs font-semibold px-2 py-[2px] rounded-tl-2xl rounded-br-2xl">
                Promo
              </div>
            </div>
          )}

          <div className="mt-2">
            <div className="text-sm font-semibold text-[#0F1B60]">{pkg.name}</div>
            <div className="text-sm font-bold">
              {pkg.quota} <span className="text-gray-400 font-normal ml-1">{pkg.duration}</span>
            </div>
          </div>

          <div className="text-right mt-2">
            {pkg.promoPrice && (
              <div className="text-sm text-gray-400 line-through">
                Rp{pkg.price.toLocaleString('id-ID')}
              </div>
            )}
            <div className="text-sm font-bold text-[#0F1B60]">
              Rp{(pkg.promoPrice ?? pkg.price).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
