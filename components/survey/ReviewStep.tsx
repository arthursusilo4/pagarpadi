// import { SurveyData, HAMA_FIELDS } from '@/lib/schema'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator'

// interface Props {
//   data: SurveyData
//   onBack: () => void
//   onSubmit: () => Promise<void>
//   isSubmitting: boolean
// }

// // Reusable row component for displaying a label/value pair
// function ReviewRow({
//   label,
//   value,
//   optional = false
// }: {
//   label: string
//   value?: string | number
//   optional?: boolean
// }) {
//   return (
//     <div className="flex justify-between items-start py-3 gap-4">
//       <span className="text-sm text-muted-foreground shrink-0 w-[45%]">
//         {label}
//         {optional && (
//           <span className="ml-1 text-xs text-muted-foreground/60">(opsional)</span>
//         )}
//       </span>
//       <span className="text-sm font-medium text-right">
//         {value !== undefined && value !== '' ? (
//           value
//         ) : (
//           <span className="text-muted-foreground/50 italic">Tidak diisi</span>
//         )}
//       </span>
//     </div>
//   )
// }

// // Badge color based on frequency value
// function FrequencyBadge({ value }: { value: string }) {
//   const colorMap: Record<string, string> = {
//     'Sangat jarang': 'bg-green-100 text-green-700 border-green-200',
//     'Jarang':         'bg-blue-100 text-blue-700 border-blue-200',
//     'Kadang':         'bg-yellow-100 text-yellow-700 border-yellow-200',
//     'Sering':         'bg-orange-100 text-orange-700 border-orange-200',
//     'Sangat sering':  'bg-red-100 text-red-700 border-red-200',
//   }
//   return (
//     <span className={`text-xs px-2 py-1 rounded-full border font-medium ${colorMap[value] ?? ''}`}>
//       {value}
//     </span>
//   )
// }

// export function ReviewStep({ data, onBack, onSubmit, isSubmitting }: Props) {
//   return (
//     <div className="min-h-screen bg-background py-10 px-4">
//       <div className="max-w-2xl mx-auto space-y-6">

//         {/* ── Header ── */}
//         <div className="text-center mb-8">
//           <div className="text-4xl mb-3">🌾</div>
//           <h2 className="text-2xl font-bold tracking-tight">
//             Periksa Jawaban Anda
//           </h2>
//           <p className="text-muted-foreground text-sm mt-2">
//             Pastikan semua data sudah benar sebelum mengirim
//           </p>
//         </div>

//         {/* ── Section 1: Informasi Umum ── */}
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base flex items-center gap-2">
//               <span>📋</span> Informasi Umum
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-0">
//             <ReviewRow
//               label="Nama"
//               value={data.nama}
//             />
//             <Separator />
//             <ReviewRow
//               label="Pengalaman Bertani"
//               value={`${data.pengalaman_bertani} tahun`}
//             />
//             <Separator />
//             <ReviewRow
//               label="Frekuensi Hama Sebelum Panen"
//               value={data.frekuensi_hama}
//             />
//             <Separator />
//             <ReviewRow
//               label="Bulan saat Hama Sering Menyerang"
//               value={data.bulan_serangan}
//             />
//           </CardContent>
//         </Card>

//         {/* ── Section 2: Jenis Hama ── */}
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-base flex items-center gap-2">
//               <span>🐛</span> Jenis Hama yang Sering Menyerang
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-0">
//             {HAMA_FIELDS.map((hama, index) => (
//               <div key={hama.key}>
//                 <div className="flex justify-between items-center py-3 gap-4">
//                   <span className="text-sm text-muted-foreground shrink-0 w-[55%]">
//                     {hama.label}
//                   </span>
//                   <FrequencyBadge value={data[hama.key]} />
//                 </div>
//                 {index < HAMA_FIELDS.length - 1 && <Separator />}
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* ── Section 3: Hama Lainnya (only show if filled) ── */}
//         {data.hama_lainnya && data.hama_lainnya.trim() !== '' && (
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-base flex items-center gap-2">
//                 <span>📝</span> Hama / Penyakit Lainnya
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-0 pb-4">
//               <p className="text-sm text-foreground leading-relaxed mt-2">
//                 {data.hama_lainnya}
//               </p>
//             </CardContent>
//           </Card>
//         )}

//         {/* ── Action Buttons ── */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-2">
//           <Button
//             variant="outline"
//             className="flex-1"
//             onClick={onBack}
//             disabled={isSubmitting}
//           >
//             ← Kembali &amp; Edit
//           </Button>
//           <Button
//             className="flex-1"
//             onClick={onSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting
//               ? (
//                 <span className="flex items-center gap-2">
//                   <span className="animate-spin">⏳</span> Mengirim...
//                 </span>
//               ) : (
//                 'Kirim Jawaban ✓'
//               )
//             }
//           </Button>
//         </div>

//         <p className="text-center text-xs text-muted-foreground pb-4">
//           Dengan mengirim, Anda menyetujui bahwa data ini digunakan untuk keperluan penelitian.
//         </p>

//       </div>
//     </div>
//   )
// }