import { Request, Response } from "express";
import { BaseController } from "../../base/base.controller";
import { TodoService } from "./todo.service";
import { TodoType, TodoUpdateType } from "./todo.type";
import { SuccessPayload } from "../../base/base.type";

export class TodoController extends BaseController {
    private todoService: TodoService
    constructor(service: { todoService: TodoService }) {
        super(service)
        this.todoService = this.getService("todoService")
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.todoService.list()
            this.safeResponse(res, { payload: data });
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
            this.safeResponse(res, { payload: { message: "Todo item deleted successfully." } });
        } catch (error) {
            this.safeError(res, error);
        }
    }
}