import { BaseService } from "../../base/base.service";
import { TodoRepository } from "./todo.repository";
import { TodoStatusUpdateType, TodoType, TodoUpdateType } from "./todo.type";

export class TodoService extends BaseService {
    private todoRepo: TodoRepository
    constructor(repos: { todoRepo: TodoRepository }) {
        super(repos);
        this.todoRepo = this.getRepository("todoRepo")
    }

    public async list(): Promise<any> {
        return this.todoRepo.findAll()
    }

    public async create(todo: TodoType) {
        return this.todoRepo.create(todo)
    }

    public async delete(id: string) {
        return this.todoRepo.delete(id)
    }

    public async update(updateTodo: TodoUpdateType) {
        return this.todoRepo.update(updateTodo)
    }

    public async updateStatus(updateStatus: TodoStatusUpdateType) {
        return this.todoRepo.updateStatus(updateStatus)
    }

}