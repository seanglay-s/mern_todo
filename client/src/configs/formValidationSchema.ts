import * as Yup from "yup";

export const formValidation = {
    createTodoSchema: Yup.object({
        title: Yup.string()
            .max(15, "Must be 15 characters or less").required("Required"),
        description: Yup.string(),
        completed: Yup.boolean()
    }),

};