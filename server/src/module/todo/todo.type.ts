import { z } from 'zod'

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean().default(false),
})

export type TodoType = z.infer<typeof todoSchema>
export type TodoUpdateType = z.infer<typeof todoSchema> & {
    _id: string
}