import { z } from 'zod'

const successPayloadSchema = z.object({
    statusCode: z.number().optional(),
    message: z.string().optional(),
    payload: z.record(z.string().optional(), z.any())
})

export type SuccessPayload = z.infer<typeof successPayloadSchema>

const routeConfigSchema = z.object({
    prefix: z.string(),
    tag: z.string(),
    tagDescription: z.string()
})

export type RouteConfig = z.infer<typeof routeConfigSchema>

const requestOptionSchema = z.object({
    path: z.string(),
    sampleRequest: z.record(z.any()).optional()
})

export type RequestOption = z.infer<typeof requestOptionSchema>

const appConfigSchema = z.object({
    port: z.string(),
    apiVersion: z.string(),
    allowHttpLog: z.number(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;