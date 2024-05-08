import cors from "cors";
import { App } from "./base/base.app";
import { BaseController } from "./base/base.controller";
import { BaseRoute } from "./base/base.route";
import { AppConfig } from "./base/base.type";
import { TodoController } from "./module/todo/todo.controller";
import { TodoRepository } from "./module/todo/todo.repository";
import { TodoRoute } from "./module/todo/todo.route";
import { TodoService } from "./module/todo/todo.service";
import { Env } from "./config/env.config";
import { dbConfig } from "./config/db.config";

const appConfig: AppConfig = {
    port: Env.APP_PORT,
    apiVersion: "v1",
    allowHttpLog: Env.ALLOWED_HTTP_LOG || 1
};

dbConfig()
class Application extends App {
    registerRoute(): BaseRoute<BaseController>[] {
        const todoService = new TodoService({ todoRepo: new TodoRepository() });
        const todoController = new TodoController({ todoService: todoService });

        return [
            new TodoRoute(todoController, { prefix: "todos", tag: "Todo", tagDescription: "Todo Services" })
        ];
    }

    extraRoute(): void {
        // Implement any additional routes here
    }

    extraMiddleware(callback: () => void): void {
        const allowedOrigins: string[] = Env.ALLOWED_ORIGINS ? Env.ALLOWED_ORIGINS.split(",") : [];
        this.app.use(cors({
            origin: allowedOrigins, //required to set to frontend web url due to security from web
            methods: ["HEAD", "DELETE", "POST", "GET", "OPTIONS", "PUT", "PATCH"],
            allowedHeaders: ["*"],
            credentials: true //required to set to true due to use cookie base auth
        }));
        callback();
    }
}
new Application(appConfig);
