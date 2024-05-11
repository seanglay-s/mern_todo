import { BaseRepository } from "../../base/base.repository";
import Todo, { ITodo } from './todo.model'
import { TodoStatusUpdateType, TodoType, TodoUpdateType } from "./todo.type";

export class TodoRepository extends BaseRepository {
    async findAll(): Promise<any[]> {
        return await Todo.find({}, { title: 1, description: 1, completed: 1 })
    }
    findById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async create(param: TodoType): Promise<any> {
        const todo: ITodo = new Todo(param)
        await todo.save()
        return todo
    }
    async delete(id: any): Promise<void> {
        await Todo.findByIdAndDelete(id)
    }
    async update(param: TodoUpdateType): Promise<any> {
        return await Todo.findByIdAndUpdate(param._id, param, { new: true })
    }

    async updateStatus(todoUpdateStatus: TodoStatusUpdateType) {
        await Todo.findByIdAndUpdate(todoUpdateStatus._id, todoUpdateStatus)
    }
}