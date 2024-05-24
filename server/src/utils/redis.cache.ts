import { z } from "zod";
import { createClient, RedisClientType, SetOptions } from "redis";
import crypto from "crypto";
import { ErrorResponse } from "../types/error.type";
import RedisError, { CacheParam, RedisParam } from "../types/redis.type";


export class RedisCache {
    private client: RedisClientType | undefined;
    constructor(connection: string) {
        this.initRedis(connection);
    }

    private async initRedis(connection: string) {
        try {
            if (!connection) throw new Error();
            this.client = await createClient({ url: connection });
            this.client
                .on("error", (error: any) => {
                    console.log("Redis error : ", error);
                })
                .on("ready", () => {
                    console.log("Connected to redis server");
                })
                .on("reconnecting", () => {
                    console.log("Redis is reconnecting...");
                })
                .on("end", () => {
                    console.log("Redis server is closed");
                })
                .connect();

        } catch {
            throw new RedisError(ErrorResponse.InvalidRedisConnection);
        }
    }

    public async set(param: z.infer<typeof RedisParam>) {
        if (!this.client) throw new RedisError(ErrorResponse.RedisClientNotInitialized);
        try {
            const validation = RedisParam.safeParse(param);
            if (!validation.success) {
                console.log(validation.error);
                throw new RedisError(ErrorResponse.RedisOperationFailed);
            }
            const { key, expInSec, value } = param;
            await this.client.setEx(key, expInSec, value);
        } catch (error) {
            throw new RedisError(ErrorResponse.RedisOperationFailed);
        }
    }

    public async get(key: string) {
        if (!this.client) throw new RedisError(ErrorResponse.RedisClientNotInitialized);
        try {
            return this.client.get(key);
        } catch (error) {
            throw new RedisError(ErrorResponse.RedisOperationFailed);
        }
    }
}

export const genCacheKey = ({ key, endpoint }: z.infer<typeof CacheParam>) => {
    let ep = endpoint.split("/").join("-");
    if (ep.startsWith("-")) {
        ep = ep.slice(1);
    }

    const rawKey = `${ep}-${key}`;
    return `app:cache-${hashGen(rawKey)}`;
};

const hashGen = (input: string): string => {
    const hash = crypto.createHash("md5");
    hash.update(input);
    return hash.digest("hex");
};