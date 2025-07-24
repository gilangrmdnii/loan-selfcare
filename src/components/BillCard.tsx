'use client'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { decryptCustParam } from '@/utils/decryptCustParam'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function BillCard() {
  const {
    // msisdn,
    outstanding,
    loading,
    // unpaid,
  } = useAppSelector((state) => state.loanHistory)

  const cipherPassword = process.env.NEXT_PUBLIC_CHIPER ?? "";
  const [msisdn, setMsisdn] = useState("-");

  useEffect(() => {
    const custParam = Cookies.get('custParam') ?? '';
    console.log(custParam)

    if (custParam !== '') {
      const decryptedCustParam = decryptCustParam(cipherPassword, custParam);
      const msisdnDecrypted = decryptCustParam(cipherPassword, decryptedCustParam.split('|')[0]);
      localStorage.setItem("msisdn", msisdnDecrypted);
      setMsisdn(msisdnDecrypted);
    }
  }, [cipherPassword]);

  // const offerCommercialName = unpaid.length > 0 ? unpaid[0].offerCommercialName : null
  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Memuat tagihan...</p>
  }

  return (
    <div className="bg-gray-50 rounded-xl mt-4 p-4 shadow-sm">
      <p className="text-xs text-gray-500">Prabayar {msisdn}</p>

      {outstanding !== null && outstanding > 0 ?
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-base text-gray-800">Tagihan Anda</h2>

            <div className="text-right">
              <p className="text-red-600 font-bold text-lg mt-4">
                Rp{outstanding?.toLocaleString('id-ID') || '0'}
              </p>
              {/* {msisdn && transactionID && ( */}
              <Link
                className="text-sm font-bold text-blue-600"
                href={{
                  pathname: '/loan-history',
                }}
              >
                Riwayat Transaksi
              </Link>
            </div>
          </div>
          <div className="mt-2 text-sm flex items-center gap-1">
            <span className="text-red-500">⚠</span>
            <p className="text-gray-500">
              Topup pulsa untuk melunasi tagihan
            </p>
          </div>
        </div>
        :
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.76435 2.99755C10.9568 1.66553 13.0423 1.66553 14.2347 2.99754L14.9355 3.78031C15.138 4.0066 15.4325 4.12855 15.7357 4.11179L16.7847 4.0538C18.5698 3.95511 20.0444 5.42976 19.9458 7.21482L19.8878 8.26383C19.871 8.56708 19.993 8.86151 20.2192 9.06409L21.002 9.76484C22.334 10.9573 22.334 13.0428 21.002 14.2352L20.2192 14.936C19.993 15.1385 19.871 15.433 19.8878 15.7362L19.9458 16.7852C20.0444 18.5703 18.5698 20.0449 16.7847 19.9462L15.7357 19.8883C15.4325 19.8715 15.138 19.9934 14.9355 20.2197L14.2347 21.0025C13.0423 22.3345 10.9568 22.3345 9.76435 21.0025L9.0636 20.2197C8.86102 19.9934 8.56659 19.8715 8.26334 19.8883L7.21433 19.9462C5.42927 20.0449 3.95462 18.5703 4.05331 16.7852L4.1113 15.7362C4.12807 15.433 4.00611 15.1385 3.77982 14.936L2.99706 14.2352C1.66504 13.0428 1.66504 10.9573 2.99706 9.76484L3.77982 9.06409C4.00611 8.86151 4.12807 8.56708 4.1113 8.26383L4.05331 7.21482C3.95462 5.42976 5.42927 3.95511 7.21433 4.0538L8.26334 4.11179C8.56659 4.12855 8.86102 4.0066 9.0636 3.78031L9.76435 2.99755ZM16.7332 10.52C17.0883 10.1722 17.0883 9.60849 16.7332 9.26078C16.3782 8.91307 15.8026 8.91307 15.4476 9.26078L11.0429 13.5748L8.50025 11.4403C8.11904 11.1203 7.54513 11.1635 7.21839 11.5368C6.89164 11.9102 6.93579 12.4723 7.31699 12.7923L10.9049 15.8812C10.9831 15.9485 11.0997 15.9453 11.1741 15.8737L16.7332 10.52Z" fill="#008E53" />
              </svg>
              <h2 className="font-semibold text-base text-gray-800">Tagihan Lunas</h2>
            </div>
            <div className="text-right mt-10">
              <Link
                className="text-sm font-bold text-blue-600"
                href={{
                  pathname: '/loan-history',
                }}
              >
                Riwayat Tagihan
              </Link>
            </div>
          </div>
        </div>
      }

    </div>
  )
}