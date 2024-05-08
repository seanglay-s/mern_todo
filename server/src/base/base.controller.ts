import { Response } from "express";
import { safeError, safeResponse } from "./base.response";
import { BaseService } from "./base.service";
import { SuccessPayload } from "./base.type";

export abstract class BaseController {
    protected service: { [key: string]: BaseService }
    constructor(service: { [key: string]: BaseService }) {
        this.service = service;
    }

    protected getService<S extends BaseService>(serviceName: string): S {
        const service = this.service[serviceName];
        if (!service) {
            throw new Error(`Service "${serviceName}" not found.`);
        }
        return service as S;
    }

    protected safeResponse(res: Response, data: SuccessPayload): void {
        safeResponse(res, data);
    }

    protected safeError(res: Response, error: any): void {
        safeError(res, error);
    }
}