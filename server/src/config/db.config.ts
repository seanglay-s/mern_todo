import { logger } from "../utils/logger";
import mongoose from "mongoose";
import { Env } from "./env.config";

export const dbConfig = async (): Promise<void> => {
    try {
        await mongoose.connect(Env.MONGODB_URI)
        logger.info('Connected to MongoDB')
    } catch (error) {
        logger.error(error)
    }
}