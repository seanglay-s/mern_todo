import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors'
import { AppConfig } from "./base.type";
import { Env } from "../config/env.config";
import path from "path";
import fs from 'fs'
import { BaseRoute } from "./base.route";
import { BaseController } from "./base.controller";
import { logger } from "../utils/logger";

export abstract class App {
    public app: Application;
    private appConfig: AppConfig;
    abstract registerRoute(): BaseRoute<BaseController>[]
    abstract extraRoute(): void;
    abstract extraMiddleware(callback: () => void): void;

    constructor(config: AppConfig) {
        this.app = express();
        this.appConfig = config;
        this.config();
    }

    private config(): void {
        const allowedOrigins = Env.ALLOWED_ORIGINS ? Env.ALLOWED_ORIGINS.split(",") : "*";
        this.app.use(cors({
            origin: allowedOrigins,
            credentials: true
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.extraMiddleware(() => {
            this.setupRoutes();
        });
    }

    private setupRoutes(): void {
        this.extraRoute();
        this.app.get("/", (req: Request, res: Response) => {
            const { port, apiVersion, allowHttpLog } = this.appConfig;
            res.send({
                port,
                apiVersion,
                allowHttpLog,
                ...this.getAppInfo()
            });
        });

        const routes = this.registerRoute();
        routes.forEach((route) => {
            this.app.use(route.getRouter());
        });

        this.startServer(this.appConfig.port);
    }

    private startServer(port: string): void {
        this.app.listen(port, () => {
            logger.info(`App is running on port: ${port}`);
        });
    }

    private getAppInfo(): any {
        const packageJsonContent = fs.readFileSync(path.resolve(process.cwd(), "./package.json"), "utf8");
        const { version: buildVersion, name, description } = JSON.parse(packageJsonContent);
        return { buildVersion, name, description };
    }
}