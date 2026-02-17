import { z } from 'zod'

export const FREKUENSI_OPTIONS = [
  'Sangat jarang',
  'Jarang',
  'Kadang',
  'Sering',
  'Sangat sering',
] as const

export const HAMA_FIELDS = [
  { key: 'hama_wereng',           label: 'Wereng Batang Coklat'   },
  { key: 'hama_tikus',            label: 'Tikus'                   },
  { key: 'hama_putih_palsu',      label: 'Hama Putih Palsu'        },
  { key: 'hama_keong_mas',        label: 'Keong Mas'               },
  { key: 'hama_penggerek_putih',  label: 'Penggerek Batang Putih'  },
  { key: 'hama_penggerek_kuning', label: 'Penggerek Batang Kuning' },
] as const

export type HamaKey = typeof HAMA_FIELDS[number]['key']

// ✅ Fix: use 'message' instead of 'required_error'
const frekuensiSchema = z.enum(FREKUENSI_OPTIONS, {
  message: 'Pilih salah satu pilihan',
})

export const surveySchema = z.object({

  nama: z.string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama terlalu panjang'),

  pengalaman_bertani: z.coerce.number({
    error: 'Masukkan angka yang valid',  // ✅ this one is still valid
  })
  .int('Harus bilangan bulat')
  .min(0, 'Tidak boleh negatif')
  .max(100, 'Nilai terlalu besar'),

  frekuensi_hama: z.string()
    .min(1, 'Wajib diisi')
    .max(50),

  bulan_serangan: z.string()
    .min(1, 'Wajib diisi')
    .max(100),

  hama_wereng:           frekuensiSchema,
  hama_tikus:            frekuensiSchema,
  hama_putih_palsu:      frekuensiSchema,
  hama_keong_mas:        frekuensiSchema,
  hama_penggerek_putih:  frekuensiSchema,
  hama_penggerek_kuning: frekuensiSchema,

  hama_lainnya: z.string()
    .max(500, 'Maksimal 500 karakter')
    .optional()
    .or(z.literal('')),
})

export type SurveyData = z.infer<typeof surveySchema>