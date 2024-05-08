import { Response } from "express";
import { SuccessPayload } from "./base.type";
import { ErrorResponseType } from "../types/error.type";

export const safeResponse = (res: Response, data: SuccessPayload): void => {
    const { statusCode, message, payload } = data;

    res.status(statusCode ? statusCode : 200).json({
        message: message ? message : "Success",
        data: payload
    });
};

export class ApiError extends Error {
    public errorType: ErrorResponseType;
    constructor(errorType: ErrorResponseType) {
        super();
        this.name = this.constructor.name;
        this.errorType = errorType;
    }
}

export const safeError = <E extends Error>(res: Response, error: E, errPayload?: { [key: string]: any }): void => {
    if (error instanceof ApiError) {
        const { statusCode, code, message } = error.errorType;
        res.status(statusCode).json({
            code,
            message,
            data: errPayload ? errPayload : {}
        });
    }
    else {
        res.status(500).json({
            code: "UNKNOWN",
            message: error.message ? error.message : "Ops! something went wrong.",
            data: {}
        });
    }
};