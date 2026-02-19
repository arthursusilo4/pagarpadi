'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { surveySchema, SurveyData } from '@/lib/schema'
import { FormStep } from '@/components/survey/FormStep'
import { SuccessStep } from '@/components/survey/SuccessStep'
// ❌ Remove: import { ReviewStep } from '@/components/survey/ReviewStep'

type Step = 'form' | 'success'  // ✅ Remove 'review' from the type

export default function SurveyPage() {
  const [step, setStep] = useState<Step>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema) as any,
    defaultValues: {
      nama: '',
      frekuensi_hama: '',
      hama_lainnya: '',
      lokasi_kabupaten: '',
      lokasi_kecamatan: '',
      lokasi_desa: '',
      jenis_varietas: '',
      bulan_tanam: '',
      bulan_panen: '',
    }
  })

  // ✅ Updated: Submit directly to API, no review step
  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) throw new Error('Submit failed')
      
      setStep('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      alert('Terjadi kesalahan. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  })

  if (step === 'success') return <SuccessStep />

  return <FormStep form={form} onNext={handleSubmit} isSubmitting={isSubmitting} />
}