export interface ITodo {
    _id: string,
    title: string,
    description: string,
    completed: boolean
}

export interface ICreateTodo {
    title: string,
    description: string,
    completed: boolean
}