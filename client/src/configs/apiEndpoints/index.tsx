export const API_ENDPOINTS = {
    BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
    TODO: {
        CREATE_TODO: () => `${API_ENDPOINTS.BASE_URL}/todos`,
        LIST_ALL_TODOS: () => `${API_ENDPOINTS.BASE_URL}/todos`,
        GET_TODO_DETAIL: (slugId: string) => `${API_ENDPOINTS.BASE_URL}/todos/${slugId}`,
        UPDATE_TODO: (slugId: string) => `${API_ENDPOINTS.BASE_URL}/todos/${slugId}`,
        DELETE_TODO: (slugId: string) => `${API_ENDPOINTS.BASE_URL}/todos/${slugId}`,
        UPDATE_STATUS_TODO: (slugId: string) => `${API_ENDPOINTS.BASE_URL}/todos/${slugId}`,

    },
};