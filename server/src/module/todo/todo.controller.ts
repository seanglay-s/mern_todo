import { Request, Response } from "express";
import { BaseController } from "../../base/base.controller";
import { TodoService } from "./todo.service";
import { TodoType, TodoUpdateType } from "./todo.type";
import { SuccessPayload } from "../../base/base.type";
import { redisClient } from "../../config/redis.config";
import { genCacheKey } from "../../utils/redis.cache";
export class TodoController extends BaseController {

    private todoService: TodoService
    constructor({ todoService }: { todoService: TodoService }) {
        super({ todoService });
        this.todoService = todoService;
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const cacheKey = genCacheKey({
                endpoint: req.originalUrl,
                key: JSON.stringify(req.query)
            })
            const cacheData = await redisClient.get(cacheKey)
            let result = {};
            if (!cacheData) {
                result = await this.todoService.list()
                await redisClient.set({
                    key: cacheKey,
                    value: JSON.stringify(result),
                    expInSec: 5
                })
            } else {
                result = JSON.parse(cacheData)
            }
            this.safeResponse(res, { payload: result });
        } catch (error) {
            this.safeError(res, error);
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const todoRequestBody: TodoType = { ...req.body };
            const createdTodo = await this.todoService.create(todoRequestBody);
            const responsePayload: SuccessPayload = { payload: createdTodo };
            this.safeResponse(res, responsePayload);
        } catch (error) {
            this.safeError(res, error);
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            await this.todoService.delete(req.params.id)
            this.safeResponse(res, { payload: { message: "Todo item deleted successfully." } });
        } catch (error) {
            this.safeError(res, error);
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            const args: TodoUpdateType = {
                _id: req.params.id, ...req.body
            }
            await this.todoService.update(args)
            this.safeResponse(res, { payload: { message: "Todo item updated successfully." } });
        } catch (error) {
            this.safeError(res, error);
        }
    }

    public updateStatus = async (req: Request, res: Response) => {
        try {
            const args: TodoUpdateType = {
                _id: req.params.id, ...req.body
            }
            await this.todoService.update(args)
            this.safeResponse(res, { payload: { message: "Todo item update status successfully." } });
        } catch (error) {
            this.safeError(res, error)
        }
    }


}