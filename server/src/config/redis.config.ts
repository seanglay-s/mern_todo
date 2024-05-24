import { RedisCache } from "../utils/redis.cache";
import { Env } from "./env.config";

export const redisClient = new RedisCache(Env.REDIS_URI)