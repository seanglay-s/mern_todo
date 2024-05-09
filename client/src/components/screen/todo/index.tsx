import { alpha, Box, IconButton, InputAdornment, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography, useTheme } from "@mui/material"
import { IconDotsVertical, IconSearch, IconTrashX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../../api";
import { ITodo } from "../../../api/todo/type";
import { ChangeEvent, useState, MouseEvent } from "react";
import AddTodo from "./AddTodo";
import ConfirmationDialog from "../../shared/ConfirmationDialog";
import EditTodo from "./EditTodo";

interface HeadCell {
    id: string;
    label: string;
}

const headCells: readonly HeadCell[] = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'completed', label: "Status" },
    { id: 'action', label: '' }
];


function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                    >
                        <TableSortLabel
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    handleSearch: React.ChangeEventHandler<HTMLInputElement>;
    search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { handleSearch, search } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Box sx={{ flex: '1 1 100%' }}>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch size="1.1rem" />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search Product"
                    size="small"
                    onChange={handleSearch}
                    value={search}
                />
            </Box>
        </Toolbar>
    );
};

const TodoScreen = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openPopovers, setOpenPopovers] = useState<boolean[]>([]);

    const { data } = useQuery<ITodo[]>({
        queryKey: ['todos'], queryFn: apis.todo.getTodo
    })
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const filteredData = data?.filter((row: ITodo) => {
        return row.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setOpenPopovers((prev: boolean[]) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleClose = (index: number) => {
        setAnchorEl(null);
        setOpenPopovers((prev: boolean[]) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const deleteTodoMutation = useMutation({
        mutationFn: (id: string) => apis.todo.deleteTodo(id)
    })
    const queryClient = useQueryClient();

    const handleDeleteTodo = (id: string) => {
        deleteTodoMutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['todos']
                });
            },
            onError: (error: any) => {
                // Handle error
                console.error('Error deleting todo:', error);
            }
        })
    }

    const theme = useTheme();

    const borderColor = theme.palette.divider;

    return (
        <Box>


            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EnhancedTableToolbar
                    search={searchTerm}
                    handleSearch={handleSearch}
                />
                <AddTodo />
            </Box>
            <Paper variant="outlined" sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'>
                        <EnhancedTableHead />
                        <TableBody>
                            {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: ITodo, index: number) => {
                                    const open = openPopovers[index] || false;
                                    return <TableRow key={row._id}>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2">
                                                {row.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2">
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Box
                                                    sx={{
                                                        backgroundColor: row.completed
                                                            ? (theme) => theme.palette.success.main
                                                            : (theme) => theme.palette.error.main,
                                                        borderRadius: '100%',
                                                        height: '10px',
                                                        width: '10px',
                                                    }}
                                                />
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 1,
                                                    }}
                                                >
                                                    {row.completed ? 'Completed' : 'Incomplete'}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={(event) => handleClick(event, index)} size="small">
                                                    <IconDotsVertical size="1.1rem" />
                                                </IconButton>

                                            </Tooltip>
                                            <Popover
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={() => handleClose(index)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                                                    <EditTodo todo={row} />
                                                    <ConfirmationDialog
                                                        menu={{
                                                            icon: <IconTrashX />,
                                                            title: 'Delete',
                                                        }}
                                                        button={{
                                                            agreeTitle: 'Yes, Delete it',
                                                            disagreeTitle: 'Keep this todo',
                                                        }}
                                                        handleAgree={async () => {
                                                            handleDeleteTodo(row._id)
                                                            handleClose(index);
                                                        }}
                                                    />
                                                </Paper>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.length ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default TodoScreen