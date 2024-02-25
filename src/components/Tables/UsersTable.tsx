import {
    Box,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import './tables.scss';
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

const subscribersList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
];

const UsersTable = () => {
    document.title = 'Users table';
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Box
                marginTop='40px'
                textAlign='left'>
                <Typography variant='h5'>Users table</Typography>
            </Box>
            <Box
                width='60vw'
                marginBottom='30px'
                marginTop='10px'
                className='table-container'
                sx={{ maxHeight: 440 }}
                overflow='auto'>
                <StyledTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align='center'>Company</TableCell>
                            <TableCell align='center'>Start Date</TableCell>
                            <TableCell align='left'>Status</TableCell>
                            <TableCell align='left'>Amount</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscribersList
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>
                                        {subscriber.name}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {subscriber.company}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {subscriber.date}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {subscriber.status}
                                    </TableCell>
                                    <TableCell align='left'>
                                        ${subscriber.amount}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton>
                                            <CloseIcon color='error' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component='div'
                    rowsPerPage={rowsPerPage}
                    count={subscribersList.length}
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

export default UsersTable;
