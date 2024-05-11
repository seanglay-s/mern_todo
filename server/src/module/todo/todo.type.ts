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

const todoStatusSchema = z.object({
    _id: z.string(),
    completed: z.boolean()
})

export type TodoStatusUpdateType = z.infer<typeof todoStatusSchema>

