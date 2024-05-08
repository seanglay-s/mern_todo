import { z } from 'zod'

const ErrorResponseTypeSchema = z.object({
    statusCode: z.number(),
    code: z.string(),
    message: z.string().optional()
})

export type ErrorResponseType = z.infer<typeof ErrorResponseTypeSchema>

export class ErrorResponse {
    static ValidationError: ErrorResponseType = {
        statusCode: 422,
        code: "VALIDATION_FAIL",
        message: "Invalid parameters"
    };
    static RequestLimit: ErrorResponseType = {
        statusCode: 429,
        code: "TOO_MANY_REQUEST",
        message: "Too Many Requests"
    };

}