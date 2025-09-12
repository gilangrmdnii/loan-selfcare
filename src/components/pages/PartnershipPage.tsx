"use client";

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchBookingValidate } from "@/features/bookingValidate/bookingValidateSlice";
import { fetchBookingConsent } from '@/features/bookingConsent/bookingConsentSlice';

export default function PartnershipPage() {
  const params = useParams();
  const code = params.code as string;
  
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const { validation, bookingId, loading, error } = useAppSelector(
    (state) => state.bookingValidate
  )

  useEffect(() => {
    if (code) {
      dispatch(fetchBookingValidate(code));
    }
  }, [dispatch, code]);

  const handleNext = async () => {
    const payload = {
      agree: true,
      bookingId: bookingId,
      code: code,
    }

    try {
      const response = await dispatch(fetchBookingConsent(payload)).unwrap();
      const data = response.data;
    
      if (data.redirect === true) {
        window.location.href = data.redirectUrl;
      } else {
        router.push('/partnership-notavailable');
      }
    } catch (error) {
       router.push('/partnership-notavailable');
    }
  }

  const handleCancel = async () => {
    const payload = {
      agree: false,
      bookingId: bookingId,
      code: code,
    }

    try {
      const response = await dispatch(fetchBookingConsent(payload)).unwrap();
    
      router.push('/partnership-cancel');
    } catch (error) {
      router.push('/partnership-cancel');
    } 
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-screen-sm px-4 pb-20">
        <Header />

        <div className="mt-8 text-center mt-40">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-30 h-30 flex items-center justify-center">
                <img src="/assets/images/icon-darurat.svg" alt="icob" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Anda akan dialihkan ke halaman mitra pembayaran
          </h2>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-xl p-4">
          
          <button className="w-full bg-red-600 text-white font-semibold py-3 rounded-[30px]" onClick={handleNext}>
            Lanjutkan
          </button>

          <button className="w-full bg-red-600 text-white font-semibold py-3 mt-4 rounded-[30px]" onClick={handleCancel}>
            Batalkan
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Dengan melanjutkan, anda menyetujui pengalihan informasi harga ke mitra pembayaran
          </p>
        </div>
      </div>
    </div>
  );
}
