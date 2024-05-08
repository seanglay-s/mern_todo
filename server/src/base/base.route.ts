import express, { NextFunction, RequestHandler, Router, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { RequestOption, RouteConfig } from "./base.type";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export abstract class BaseRoute<C extends BaseController> {
    private router: Router = express.Router();
    protected controller: C;
    public routeConfig: RouteConfig;
    abstract initializeRoutes(): void;
    public sampleRequest:
        {
            path: string,
            method: HttpMethod,
            data?: Record<string, any>
        }[] = [];
    constructor(controller: C, routeConfig: RouteConfig) {
        this.controller = controller;
        this.routeConfig = routeConfig;
        this.initializeRoutes();
    }

    private wrapRoute(method: HttpMethod, option: RequestOption, handlers: ((req: Request, res: Response, next: NextFunction) => void)[]) {
        const { path, sampleRequest } = option;
        const prefix = this.routeConfig.prefix.startsWith("/") ? this.routeConfig.prefix : `/${this.routeConfig.prefix}`;
        const newPath = path && path !== "/" ? path : "";
        const wrappedHandlers = handlers.map(handler => {
            return (req: Request, res: Response, next: NextFunction) => {
                handler(req, res, next);
            };
        });

        const basePath = `${prefix}${newPath}`;
        this.sampleRequest.push({ path: basePath, method: method, data: sampleRequest });
        (this.router as any)[method](basePath, ...wrappedHandlers);
    }

    post(option: RequestOption, ...handlers: RequestHandler[]) {
        this.wrapRoute("post", option, handlers);
    }

    get(option: RequestOption, ...handlers: RequestHandler[]) {
        this.wrapRoute("get", option, handlers);
    }

    delete(option: RequestOption, ...handlers: RequestHandler[]) {
        this.wrapRoute("delete", option, handlers);
    }

    put(option: RequestOption, ...handlers: RequestHandler[]) {
        this.wrapRoute("put", option, handlers);
    }

    patch(option: RequestOption, ...handlers: RequestHandler[]) {
        this.wrapRoute("patch", option, handlers);
    }

    public getRouter(): express.Router {
        return this.router;
    }
}