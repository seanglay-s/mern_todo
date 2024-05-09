import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormHelperText, Switch, TextField, Typography } from "@mui/material"
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
    })
    const queryCleint = useQueryClient();

    const handleSubmit = useCallback((values: ICreateTodo, action: any) => {
        createTodoMutation.mutate(values, {
            onSuccess: (data) => {
                queryCleint.invalidateQueries({
                    queryKey: ['todos']
                });
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message;
                console.log(message);
            },
        })

    }, [createTodoMutation])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: "",
            completed: false
        },
        validationSchema: formValidation.createTodoSchema,
        onSubmit: handleSubmit
    })
    return (
        <>
            <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
                Add Note
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Typography variant="h5" mb={2} fontWeight={700}>
                            Add New Todo
                        </Typography>
                        <DialogContentText>
                            To add new notes please enter your title and description. and press the
                            submit button to add new todo.
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
                        {createTodoMutation.isPending ? <LoadingButton loading
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

export default AddTodo