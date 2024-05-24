import { z } from 'zod'
import { ErrorCode, ErrorMessage } from '../utils/http.helper';

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

    static InvalidRedisConnection: ErrorResponseType = {
        statusCode: 500,
        code: ErrorCode.INVALID_REDIS_CONNECTION,
        message: ErrorMessage.INVALID_REDIS_CONNECTION
    };

    static RedisClientNotInitialized: ErrorResponseType = {
        statusCode: 500,
        code: ErrorCode.INVALID_REDIS_CONNECTION,
        message: ErrorMessage.INVALID_REDIS_CONNECTION
    };

    static RedisOperationFailed: ErrorResponseType = {
        statusCode: 500,
        code: ErrorCode.REDIS_OPERATION_FAILED,
        message: ErrorMessage.REDIS_OPERATION_FAILED
    };

}

