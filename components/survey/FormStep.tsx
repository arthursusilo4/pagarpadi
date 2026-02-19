'use client'

import { UseFormReturn } from 'react-hook-form'
import { SurveyData, HAMA_FIELDS, FREKUENSI_OPTIONS } from '@/lib/schema'
import { Form, FormField, FormItem, FormLabel,
         FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  form: UseFormReturn<SurveyData>
  onNext: () => void
}

export function FormStep({ form, onNext }: Props) {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            PAGAR PADI
          </h1>
          <p className="text-muted-foreground text-sm">
            Survei Data Hama Padi — Isi semua kolom dengan benar
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={onNext} className="space-y-6">

            {/* ── Nama ── */}
            <FormField control={form.control} name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap Anda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Pengalaman Bertani ── */}
            <FormField control={form.control} name="pengalaman_bertani"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengalaman Bertani <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Tahun"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Frekuensi Hama ── */}
            <FormField control={form.control} name="frekuensi_hama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Frekuensi Hama Sebelum Panen
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Rendah / Sedang / Tinggi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Bulan Serangan ── */}
            <FormField control={form.control} name="bulan_serangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bulan saat Hama Sering Menyerang
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Januari, Maret" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Jenis Hama (6 radio groups) ── */}
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div>
                  <p className="font-semibold mb-1">
                    Jenis Hama yang Sering Menyerang
                    <span className="text-destructive"> *</span>
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    Pilih frekuensi untuk setiap jenis hama
                  </p>

                  {/* Dynamic render — one radio group per pest */}
                  <div className="space-y-6">
                    {HAMA_FIELDS.map((hama) => (
                      <FormField
                        key={hama.key}
                        control={form.control}
                        name={hama.key}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              {hama.label}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-wrap gap-3 mt-2"
                              >
                                {FREKUENSI_OPTIONS.map((opt) => (
                                  <div key={opt}
                                    className="flex items-center space-x-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                                  >
                                    <RadioGroupItem value={opt} id={`${hama.key}-${opt}`} />
                                    <Label
                                      htmlFor={`${hama.key}-${opt}`}
                                      className="text-xs cursor-pointer"
                                    >
                                      {opt}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Hama Lainnya (optional) ── */}
            <FormField control={form.control} name="hama_lainnya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Adakah jenis hama/penyakit lain?
                    <span className="text-muted-foreground text-xs ml-2">(opsional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsikan jika ada..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Periksa Jawaban →
            </Button>

          </form>
        </Form>
      </div>
    </div>
  )
}