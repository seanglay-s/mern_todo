import { API_ENDPOINTS } from "../../configs/apiEndpoints"
import { API } from "../base"
import { ICreateTodo, ITodo, IUpdateStatusTodo, IUpdateTodo } from "./type"

export const TODO_API = {
    async getTodo(): Promise<ITodo[]> {
        const res = await API.get(API_ENDPOINTS.TODO.LIST_ALL_TODOS())
        return res.data.data
    },
    async createTodo(params: ICreateTodo) {
        const res = await API.post(API_ENDPOINTS.TODO.CREATE_TODO(), params)
        console.log(res)
        return res
    },
    async deleteTodo(id: string) {
        const res = await API.delete(API_ENDPOINTS.TODO.DELETE_TODO(id))
        return res
    },
    async updateTodo(params: IUpdateTodo) {
        console.log(params)
        const res = await API.put(API_ENDPOINTS.TODO.UPDATE_TODO(params.id), params)
        return res
    },
    async updateStatusTodo(param: IUpdateStatusTodo) {
        const res = await API.patch(API_ENDPOINTS.TODO.UPDATE_STATUS_TODO(param.id), param)
        return res
    }
}