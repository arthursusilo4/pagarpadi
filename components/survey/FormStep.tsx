'use client'

import { UseFormReturn } from 'react-hook-form'
import { SurveyData, HAMA_FIELDS, FREKUENSI_OPTIONS, SISTEM_IRIGASI_OPTIONS, 
         PESTISIDA_OPTIONS, FASE_SERANGAN_OPTIONS, KONDISI_CUACA_OPTIONS,
         KEHILANGAN_HASIL_OPTIONS, LAHAN_TETANGGA_OPTIONS } from '@/lib/schema'
import { Form, FormField, FormItem, FormLabel,
         FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserIcon } from '@/components/icons/user-icon'
import { MapIcon } from '../icons/map-icon'
import { PlantIcon } from '../icons/plant-icon'
import { BugIcon } from '../icons/bug-icon'
import { ShieldIcon } from '../icons/shield-icon'
import { ChartIcon } from '@/components/icons/chart-icon'

interface Props {
  form: UseFormReturn<SurveyData>
  onNext: () => void
  isSubmitting: boolean
}

export function FormStep({ form, onNext, isSubmitting }: Props) {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <ThemeToggle />
      
      <div className="max-w-3xl mx-auto">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div className="mb-8 pt-5 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            PAGAR PADI
          </h1>
          <p className="text-muted-foreground text-xs">
            Survei Data Hama Padi — Tolong isi setiap kolom dengan benar
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={onNext} className="space-y-6">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 1: IDENTITAS PETANI */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-primary" />
                  Identitas Petani
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
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

              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 2: LOKASI LAHAN */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-primary" />
                  Lokasi Lahan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="lokasi_kabupaten"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kabupaten/Kota <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Gresik" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="lokasi_kecamatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kecamatan <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Manyar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="lokasi_desa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Desa
                          <span className="text-muted-foreground text-xs ml-2">(opsional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nama desa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="luas_lahan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Luas Lahan
                          <span className="text-muted-foreground text-xs ml-2">(opsional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Hektar"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 3: PRAKTIK BUDIDAYA */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PlantIcon className="w-5 h-5 text-primary" />
                  Praktik Budidaya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <FormField control={form.control} name="jenis_varietas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Varietas Padi <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: IR64, Ciherang, Inpari 32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="bulan_tanam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bulan Tanam <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Oktober" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="bulan_panen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bulan Panen <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Februari" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField control={form.control} name="sistem_irigasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sistem Irigasi <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {SISTEM_IRIGASI_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`irigasi-${opt}`} />
                              <Label htmlFor={`irigasi-${opt}`} className="cursor-pointer font-normal">
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

                <FormField control={form.control} name="penggunaan_pestisida"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penggunaan Pestisida <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {PESTISIDA_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`pestisida-${opt}`} />
                              <Label htmlFor={`pestisida-${opt}`} className="cursor-pointer font-normal">
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

              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 4: KONDISI HAMA */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BugIcon className="w-5 h-5 text-primary" />
                  Kondisi Hama
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

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

                <FormField control={form.control} name="fase_serangan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fase Pertumbuhan saat Hama Menyerang <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {FASE_SERANGAN_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`fase-${opt}`} />
                              <Label htmlFor={`fase-${opt}`} className="cursor-pointer font-normal">
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

                <FormField control={form.control} name="kondisi_cuaca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kondisi Cuaca Musim Ini <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {KONDISI_CUACA_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`cuaca-${opt}`} />
                              <Label htmlFor={`cuaca-${opt}`} className="cursor-pointer font-normal">
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

              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 5: JENIS HAMA (6 radio groups) */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-primary" />
                  Jenis Hama yang Sering Menyerang
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <p className="text-xs text-muted-foreground -mt-2">
                  Pilih frekuensi untuk setiap jenis hama
                </p>

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
                                className="flex items-center space-x-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors"
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
              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 6: DAMPAK & LAINNYA */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Card className="gradient-border-top gradient-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ChartIcon className="w-5 h-5 text-primary" />
                  Dampak & Informasi Tambahan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <FormField control={form.control} name="estimasi_kehilangan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimasi Kehilangan Hasil <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {KEHILANGAN_HASIL_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`kehilangan-${opt}`} />
                              <Label htmlFor={`kehilangan-${opt}`} className="cursor-pointer font-normal">
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

                <FormField control={form.control} name="lahan_tetangga_terserang"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Apakah Lahan Tetangga Juga Terserang?
                        <span className="text-muted-foreground text-xs ml-2">(opsional)</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {LAHAN_TETANGGA_OPTIONS.map((opt) => (
                            <div key={opt} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt} id={`tetangga-${opt}`} />
                              <Label htmlFor={`tetangga-${opt}`} className="cursor-pointer font-normal">
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

              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SUBMIT BUTTON */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Mengirim...
                </span>
              ) : (
                'Kirim Jawaban ✓'
              )}
            </Button>

          </form>
        </Form>
      </div>
    </div>
  )
}