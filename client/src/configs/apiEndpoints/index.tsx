export const API_ENDPOINTS = {
    BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
    TODO: {
        CREATE_TODO: "/todos",
        LIST_ALL_TODOS: "/todos",
        GET_TODO_DETAIL: "/todos/:slug-id",
        UPDATE_TODO: "/todos/:slug-id",
        DELETE_TODO: '/todos/:slug-id'
    },
};