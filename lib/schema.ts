import { z } from 'zod'

export const surveySchema = z.object({
name: z.string().min(2, "Name too short"),
email: z.string().email("Invalid email"),
rating: z.enum(['1','2','3','4','5']),
feedback: z.string().min(10).max(1000),
// add your questions here
})

export type SurveyData = z.infer<typeof surveySchema>