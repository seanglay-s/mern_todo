import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Typography, useTheme } from "@mui/material"
import { IconPlaylistAdd, IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { apis } from "../../../api";
import { ITodo } from "../../../api/todo/type";
import { ChangeEvent, useState } from "react";
import AddTodo from "./AddTodo";

interface HeadCell {
    id: string;
    label: string;
}

const headCells: readonly HeadCell[] = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'completed', label: "Status" }
];

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSearch: React.ChangeEvent<HTMLInputElement> | any;
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
        </Toolbar>
    );
};


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


const TodoScreen = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

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
        // const filteredRows: ProductType[] = getProducts.filter((row) => {
        //     return row.title.toLowerCase().includes(event.target.value);
        // });
        // setSearch(event.target.value);
        // setRows(filteredRows);
    };

    const theme = useTheme();

    const borderColor = theme.palette.divider;

    return (
        <Box>
            <Box sx={{
                display: "flex",
                gap: 4,
            }}>
                <EnhancedTableToolbar
                    numSelected={0}
                    search={""}
                    handleSearch={(event: any) => handleSearch(event)}
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
                            {data?.map((row: ITodo) => {
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