import { z } from 'zod'
import { ErrorResponseType } from "./error.type";

export const RedisParam = z.object({
    key: z.string().min(2),
    value: z.any(),
    expInSec: z.number().min(1)
});

export const CacheParam = z.object({
    endpoint: z.string().min(1),
    key: z.string().min(2)
});

export default class RedisError extends Error {
    public errorType: ErrorResponseType;
    constructor(errorType: ErrorResponseType) {
        super(errorType.message);
        this.name = this.constructor.name;
        this.errorType = errorType;
        Error.captureStackTrace(this, this.constructor);
    }
}