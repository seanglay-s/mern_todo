import { Button, Dialog, DialogActions, DialogContent, DialogContentText, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { formValidation } from "../../../configs/formValidationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../../api";
import { ITodo, IUpdateTodo } from "../../../api/todo/type";
import { LoadingButton } from "@mui/lab";
import { IconEditCircle } from "@tabler/icons-react";



const EditTodo = (todo: { todo: ITodo }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodoMutation = useMutation({
        mutationFn: (value: IUpdateTodo) => apis.todo.updateTodo(value)
    })
    const queryClient = useQueryClient();

    const handleSubmit = useCallback((values: IUpdateTodo, { resetForm }: { resetForm: () => void }) => {
        updateTodoMutation.mutate(values, {
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['todos']
                });
                resetForm()
                handleClose();
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message;
                console.log(message);
                resetForm()
                handleClose();
            },
        })
    }, [updateTodoMutation])

    const formik = useFormik({
        initialValues: {
            title: todo.todo.title,
            description: todo.todo.description,
            completed: todo.todo.completed,
            id: todo.todo._id
        },
        validationSchema: formValidation.createUpdateTodoSchema,
        onSubmit: handleSubmit
    })
    return (
        <>
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    <IconEditCircle />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Typography variant="h5" mb={2} fontWeight={700}>
                            Update New Todo
                        </Typography>
                        <DialogContentText>
                            To add new notes please enter your title and description. and press the
                            submit button to update new todo.
                        </DialogContentText>
                        <TextField
                            margin="normal"
                            fullWidth
                            size="small"
                            id="title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            variant="outlined"
                            label="Title"
                            type="text"
                        />
                        <TextField
                            multiline
                            rows={5}
                            margin="normal"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            label="Add Todo Description"
                            type="text"
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {updateTodoMutation.isPending ? <LoadingButton loading
                            variant="contained"
                            color="secondary" /> : <Button
                                type="submit"
                                variant="contained"
                            >
                            Submit
                        </Button>
                        }

                    </DialogActions>
                </form>

            </Dialog>
        </>
    )
}

export default EditTodo