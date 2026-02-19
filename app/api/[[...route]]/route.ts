import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { Context, Next } from "hono"; // ← import these two
import { surveySchema } from "@/lib/schema";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// Admin auth middleware
const adminAuth = async (c: Context, next: Next) => {
  // ← add types here
  const key = c.req.header("x-admin-key");
  if (key !== process.env.ADMIN_SECRET)
    return c.json({ error: "Unauthorized" }, 401);
  await next();
};

// POST /api/survey/submit
app.post('/survey/submit',
  zValidator('json', surveySchema),
  async (c) => {
    const data = c.req.valid('json')

    const { error } = await supabaseAdmin
      .from('responses')
      .insert({
        // Existing fields
        nama:                  data.nama,
        pengalaman_bertani:    data.pengalaman_bertani,
        frekuensi_hama:        data.frekuensi_hama,
        hama_wereng:           data.hama_wereng,
        hama_tikus:            data.hama_tikus,
        hama_putih_palsu:      data.hama_putih_palsu,
        hama_keong_mas:        data.hama_keong_mas,
        hama_penggerek_putih:  data.hama_penggerek_putih,
        hama_penggerek_kuning: data.hama_penggerek_kuning,
        hama_lainnya:          data.hama_lainnya || null,
        
        // NEW: Location fields
        lokasi_kabupaten:      data.lokasi_kabupaten,
        lokasi_kecamatan:      data.lokasi_kecamatan,
        lokasi_desa:           data.lokasi_desa || null,
        luas_lahan:            data.luas_lahan || null,
        
        // NEW: Farming practice fields
        jenis_varietas:        data.jenis_varietas,
        bulan_tanam:           data.bulan_tanam,
        bulan_panen:           data.bulan_panen,
        sistem_irigasi:        data.sistem_irigasi,
        penggunaan_pestisida:  data.penggunaan_pestisida,
        
        // NEW: Pest condition fields
        fase_serangan:         data.fase_serangan,
        kondisi_cuaca:         data.kondisi_cuaca,
        
        // NEW: Impact fields
        estimasi_kehilangan:        data.estimasi_kehilangan,
        lahan_tetangga_terserang:   data.lahan_tetangga_terserang || null,
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return c.json({ error: 'Gagal menyimpan data' }, 500)
    }

    return c.json({ success: true }, 201)
  }
);

// GET /api/admin/responses
app.get("/admin/responses", adminAuth, async (c) => {
  const { data, error } = await supabaseAdmin
    .from("responses")
    .select("*")
    .order("submitted_at", { ascending: false });
  return c.json({ data });
});

// PATCH /api/admin/responses/:id
app.patch("/admin/responses/:id", adminAuth, async (c) => {
  const id = c.req.param("id");
  const { note } = await c.req.json();
  const { error } = await supabaseAdmin
    .from("responses")
    .update({ admin_note: note })
    .eq("id", id);
  if (error) return c.json({ error }, 500);
  return c.json({ success: true });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
