import { API_ENDPOINTS } from "../../configs/apiEndpoints"
import { API } from "../base"
import { ICreateTodo, ITodo } from "./type"

export const TODO_API = {
    async getTodo(): Promise<ITodo[]> {
        const res = await API.get(API_ENDPOINTS.TODO.LIST_ALL_TODOS)
        return res.data.data
    },
    async createTodo(params: ICreateTodo) {
        const res = await API.post(API_ENDPOINTS.TODO.CREATE_TODO, params)
        console.log(res)
        return res
    },
    async deleteTodo(id: string) {
        const res = await API.delete(`API_ENDPOINTS.TODO.UPDATE_TODO/${id}`)
        return res
    }
}