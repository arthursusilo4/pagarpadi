"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, SurveyData } from "@/lib/schema";
import { FormStep } from "@/components/survey/FormStep";
import { ReviewStep } from "@/components/survey/ReviewStep";
import { SuccessStep } from "@/components/survey/SuccessStep";

type Step = "form" | "review" | "success";

export default function SurveyPage() {
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema) as any,
    defaultValues: {
      nama: "",
      frekuensi_hama: "",
      bulan_serangan: "",
      hama_lainnya: "",
    },
  });

  // Step 1: validate then go to review
  const handleGoToReview = form.handleSubmit(() => {
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Step 2: submit to API
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStep("success");
    } catch (e) {
      alert("Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "review")
    return (
      <ReviewStep
        data={form.getValues()}
        onBack={() => setStep("form")}
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    );

  if (step === "success") return <SuccessStep />;

  return <FormStep form={form} onNext={handleGoToReview} />;
}
