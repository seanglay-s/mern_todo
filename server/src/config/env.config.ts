import { getOsEnv } from "../utils/get.env";

export const Env = {
    NODE_ENV: getOsEnv("NODE_ENV"),
    APP_PORT: getOsEnv("APP_PORT"),
    ALLOWED_ORIGINS: getOsEnv("ALLOWED_ORIGINS"),
    ALLOWED_HTTP_LOG: parseInt(getOsEnv("ALLOWED_HTTP_LOG")),
    MONGODB_URI: getOsEnv("MONGODB_URI"),
};
