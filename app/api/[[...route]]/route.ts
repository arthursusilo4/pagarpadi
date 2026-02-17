import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator'
import { surveySchema } from '@/lib/schema'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs' // ← add this line, fixes the handle export issue

const app = new Hono().basePath('/api')

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

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)