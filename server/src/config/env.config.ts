import { getOsEnv } from "../utils/get.env";

export const Env = {
    NODE_ENV: getOsEnv("NODE_ENV"),
    APP_PORT: getOsEnv("APP_PORT"),
    ALLOWED_HTTP_LOG: parseInt(getOsEnv("ALLOWED_HTTP_LOG")),
    MONGODB_URI: getOsEnv("MONGODB_URI"),
    REDIS_URI: getOsEnv("REDIS_URI")
};
