import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { Context, Next } from 'hono'        // ← import these two
import { surveySchema } from '@/lib/schema'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

// Admin auth middleware
const adminAuth = async (c: Context, next: Next) => {    // ← add types here
  const key = c.req.header('x-admin-key')
  if (key !== process.env.ADMIN_SECRET)
    return c.json({ error: 'Unauthorized' }, 401)
  await next()
}

// POST /api/survey/submit
app.post('/survey/submit',
  zValidator('json', surveySchema),
  async (c) => {
    const data = c.req.valid('json')
    const { error } = await supabaseAdmin
      .from('responses')
      .insert({ answers: data })
    if (error) return c.json({ error }, 500)
    return c.json({ success: true }, 201)
  }
)

// GET /api/admin/responses
app.get('/admin/responses', adminAuth, async (c) => {
  const { data, error } = await supabaseAdmin
    .from('responses')
    .select('*')
    .order('submitted_at', { ascending: false })
  return c.json({ data })
})

// PATCH /api/admin/responses/:id
app.patch('/admin/responses/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const { note } = await c.req.json()
  const { error } = await supabaseAdmin
    .from('responses')
    .update({ admin_note: note })
    .eq('id', id)
  if (error) return c.json({ error }, 500)
  return c.json({ success: true })
})

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)