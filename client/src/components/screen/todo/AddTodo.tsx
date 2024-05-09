import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { formValidation } from "../../../configs/formValidationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../../api";
import { ICreateTodo } from "../../../api/todo/type";
import { LoadingButton } from "@mui/lab";

const AddTodo = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createTodoMutation = useMutation({
        mutationFn: apis.todo.createTodo
    });
    const queryClient = useQueryClient();

    const handleSubmit = useCallback((values: ICreateTodo, { resetForm }: { resetForm: () => void }) => {
        createTodoMutation.mutate(values, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['todos']
                });
                resetForm();
                handleClose();
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message;
                console.log(message);
                handleClose();
            },
        });
    }, [createTodoMutation, queryClient, handleClose]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: "",
            completed: false
        },
        validationSchema: formValidation.createUpdateTodoSchema,
        onSubmit: handleSubmit
    });

    return (
        <>
            <Button sx={{ mx: 2 }} variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
                Add Note
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Typography variant="h5" mb={2} fontWeight={700}>
                            Add New Todo
                        </Typography>
                        <DialogContentText>
                            To add new notes please enter your title and description, and press the
                            submit button to add a new todo.
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
                        {createTodoMutation.isPending ? (
                            <LoadingButton loading variant="contained" color="secondary" />
                        ) : (
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddTodo;
