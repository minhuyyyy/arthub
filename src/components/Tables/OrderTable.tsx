import {
    Box,
    Button,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import './tables.scss';
import { OrderType, Status } from '../../types/order';
import axios from 'axios';
import { API_URL, MOCK_API_URL } from '../../utils/urls';
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}));

const BaseTable = ({
    headers,
    content,
}: {
    headers: string[];
    content: OrderType[];
}) => {
    document.title = 'Pre-orders page';
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const acceptOrder = async (orderId: number) => {
        await axios.patch(`${MOCK_API_URL}/pre-orders/${orderId}`, {
            status: Status.processing,
        });
    };

    const denyOrder = async (orderId: number) => {
        await axios.put(`${MOCK_API_URL}/pre-orders/${orderId}`, {
            status: Status.denied,
        });
    };

    return (
        <>
            <Box marginTop="40px" textAlign="left">
                <Typography variant="h5">Orders table</Typography>
            </Box>
            <Box
                width="60vw"
                marginBottom="30px"
                marginTop="10px"
                className="table-container"
                sx={{ maxHeight: 440 }}
                overflow="auto"
            >
                <StyledTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell align="center">{header}</TableCell>
                            ))}
                            <TableCell align="center" width={'300px'}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {data.senderName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.message}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.budget.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        {Status[data.status]}
                                    </TableCell>
                                    {data.status === Status.pending ? (
                                        <TableCell align="right">
                                            <Button
                                                onClick={() =>
                                                    acceptOrder(data.id)
                                                }
                                                variant="contained"
                                                sx={{
                                                    backgroundColor:
                                                        'green !important',
                                                    marginRight: '20px',
                                                }}
                                            >
                                                Accept order
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    denyOrder(data.orderId)
                                                }
                                                variant="contained"
                                                sx={{
                                                    backgroundColor:
                                                        'red !important',
                                                }}
                                            >
                                                Deny order
                                            </Button>
                                        </TableCell>
                                    ) : (
                                        <TableCell align="center">
                                            <Button>Deliver product</Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={content.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                />
            </Box>
        </>
    );
};

export default BaseTable;
