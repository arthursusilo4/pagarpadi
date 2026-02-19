import { z } from 'zod'

// ══════════════════════════════════════════════════════════════
// ENUMS & CONSTANTS
// ══════════════════════════════════════════════════════════════

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

export const SISTEM_IRIGASI_OPTIONS = [
  'Irigasi teknis',
  'Irigasi setengah teknis',
  'Tadah hujan',
  'Kombinasi',
] as const

export const PESTISIDA_OPTIONS = [
  'Tidak pernah',
  'Jarang (1-2x per musim)',
  'Sedang (3-5x per musim)',
  'Sering (>5x per musim)',
] as const

export const FASE_SERANGAN_OPTIONS = [
  'Persemaian (0-20 hari)',
  'Vegetatif (21-55 hari)',
  'Generatif (56-85 hari)',
  'Pematangan (86+ hari)',
  'Beberapa fase',
] as const

export const KONDISI_CUACA_OPTIONS = [
  'Lebih kering dari biasanya',
  'Normal',
  'Lebih basah dari biasanya',
] as const

export const KEHILANGAN_HASIL_OPTIONS = [
  'Tidak ada (<5%)',
  'Ringan (5-15%)',
  'Sedang (15-30%)',
  'Berat (>30%)',
] as const

export const LAHAN_TETANGGA_OPTIONS = [
  'Ya, banyak',
  'Ya, sedikit',
  'Tidak',
  'Tidak tahu',
] as const

export type HamaKey = typeof HAMA_FIELDS[number]['key']

// ══════════════════════════════════════════════════════════════
// SCHEMA DEFINITION
// ══════════════════════════════════════════════════════════════

const frekuensiSchema = z.enum(FREKUENSI_OPTIONS, {
  message: 'Pilih salah satu pilihan',
})

export const surveySchema = z.object({

  // ──── Identitas Petani ────
  nama: z.string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama terlalu panjang'),

  pengalaman_bertani: z.coerce.number({
    error: 'Masukkan angka yang valid',
  })
  .int('Harus bilangan bulat')
  .min(0, 'Tidak boleh negatif')
  .max(100, 'Nilai terlalu besar'),

  // ──── Lokasi Lahan ────
  lokasi_kabupaten: z.string()
    .min(1, 'Wajib diisi')
    .max(100),

  lokasi_kecamatan: z.string()
    .min(1, 'Wajib diisi')
    .max(100),

  lokasi_desa: z.string()
    .max(100)
    .optional()
    .or(z.literal('')),

  luas_lahan: z.coerce.number({
    error: 'Masukkan angka yang valid',
  })
  .positive('Harus lebih dari 0')
  .max(1000, 'Nilai terlalu besar')
  .optional()
  .or(z.literal('')),

  // ──── Praktik Budidaya ────
  jenis_varietas: z.string()
    .min(1, 'Wajib diisi')
    .max(100),

  bulan_tanam: z.string()
    .min(1, 'Wajib diisi')
    .max(50),

  bulan_panen: z.string()
    .min(1, 'Wajib diisi')
    .max(50),

  sistem_irigasi: z.enum(SISTEM_IRIGASI_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }),

  penggunaan_pestisida: z.enum(PESTISIDA_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }),

  // ──── Kondisi Hama ────
  frekuensi_hama: z.string()
    .min(1, 'Wajib diisi')
    .max(50),

  fase_serangan: z.enum(FASE_SERANGAN_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }),

  kondisi_cuaca: z.enum(KONDISI_CUACA_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }),

  // ──── Jenis Hama (6 pests) ────
  hama_wereng:           frekuensiSchema,
  hama_tikus:            frekuensiSchema,
  hama_putih_palsu:      frekuensiSchema,
  hama_keong_mas:        frekuensiSchema,
  hama_penggerek_putih:  frekuensiSchema,
  hama_penggerek_kuning: frekuensiSchema,

  // ──── Dampak & Konteks ────
  estimasi_kehilangan: z.enum(KEHILANGAN_HASIL_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }),

  lahan_tetangga_terserang: z.enum(LAHAN_TETANGGA_OPTIONS, {
    message: 'Pilih salah satu pilihan',
  }).optional(),

  // ──── Lainnya ────
  hama_lainnya: z.string()
    .max(500, 'Maksimal 500 karakter')
    .optional()
    .or(z.literal('')),
})

export type SurveyData = z.infer<typeof surveySchema>