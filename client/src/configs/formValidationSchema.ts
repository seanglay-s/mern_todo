import * as Yup from "yup";

export const formValidation = {
    createUpdateTodoSchema: Yup.object({
        title: Yup.string()
            .required("Required"),
        description: Yup.string(),
        completed: Yup.boolean()
    }),

};