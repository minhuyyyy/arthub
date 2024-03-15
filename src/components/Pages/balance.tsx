import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import {
    formatCurrency,
    formatDataStandard,
} from '../../utils/helper/format.helper';

interface Transaction {
    historyTransactionId: number;
    artId: number;
    accountId: number;
    transactionType: TransactionType;
    transactionDate: Date;
    transactionAmount: number;
    beforeTransactionBalance: number;
    afterTransactionBalance: number;
}

enum TransactionType {
    Deposit = 1, //Nap
    Withdraw = 2, //Rut
    Purchase = 3, //Mua
    Sell = 4, //Ban
}

interface Balance {
    accountId: number;
    balance: number;
    lastUpdated: Date;
}

export default function BalancePage() {
    const { isAuthenticated, userInfo } = useAuth();

    if (!isAuthenticated) {
        redirect('/');
        return;
    }
    const userId = userInfo.id;
    const [balance, setBalance] = useState<Balance | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const fetchBalance = async () => {
        const response = await axios.get(
            'http://localhost:5247/balance/' + userId
        );
        setBalance(response.data);
    };
    const fetchTransactions = async () => {
        const response = await axios.post(
            'http://localhost:5247/balance/history',
            {
                accountId: userId,
                // transactionType: 1, // Adjust this as needed
                // fromDate: '2023-01-01', // Example start date
                // toDate: '2025-01-01', // Example end date
            }
        );
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    const addTransaction = (transaction: Transaction) => {
        setTransactions([transaction, ...transactions]);
    };

    return (
        <div>
            {balance && <BalanceComponent balance={balance.balance} />}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
            >
                <ModalDepositWithdraw
                    addTransaction={addTransaction}
                    userId={userId}
                    transType={TransactionType.Deposit}
                />
                <ModalDepositWithdraw
                    addTransaction={addTransaction}
                    userId={userId}
                    transType={TransactionType.Withdraw}
                />
            </div>
            <TransactionComponent transactions={transactions} />
        </div>
    );
}

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const ModalDepositWithdraw = ({
    userId,
    transType,
    addTransaction,
}: {
    userId: number;
    transType: TransactionType;
    addTransaction: (transaction: Transaction) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let type;
        switch (transType) {
            case TransactionType.Deposit:
                type = 'deposit';
                break;
            case TransactionType.Withdraw:
                type = 'withdraw';
                break;
        }
        await axios
            .post('http://localhost:5247/balance/' + type, {
                accountId: userId,
                amount: amount,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Success transaction!', {
                        autoClose: 2000,
                    });
                    const transaction = res.data as Transaction;
                    addTransaction(transaction);
                }
            })
            .catch((error) => {
                toast.error('Fail transaction!');
                console.log(error);
            });

        handleClose();
    };
    return (
        <div>
            <Button onClick={handleOpen}>
                {transType === TransactionType.Deposit && 'Deposit'}
                {transType === TransactionType.Withdraw && 'Withdraw'}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <h4 id="unstyled-modal-title" className="modal-title">
                        {transType === TransactionType.Deposit &&
                            'Enter amount to deposit'}
                        {transType === TransactionType.Withdraw &&
                            'Enter amount to withdraw'}
                    </h4>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(+e.target.value)}
                    />
                    <Button
                        onClick={async () => {
                            await handleSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

const BalanceComponent = ({ balance }: { balance: number }) => {
    return (
        <div>
            <h2>Current Balance</h2>
            <p>Balance: {formatCurrency(balance)}</p>
        </div>
    );
};

const TransactionComponent = ({
    transactions,
}: {
    transactions: Transaction[];
}) => {
    return (
        <div>
            <h2>Transaction History</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead
                        style={{
                            backgroundColor: 'lightgray',
                        }}
                    >
                        <TableRow>
                            <TableCell align="center">
                                Transaction Time
                            </TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Balance Before</TableCell>
                            <TableCell align="center">Balance After</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row) => (
                            <TableRow
                                key={row.accountId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="right">
                                    {formatDataStandard(row.transactionDate)}
                                </TableCell>
                                <TableCell align="center">
                                    {row.transactionType ===
                                        TransactionType.Deposit && 'Deposit'}
                                    {row.transactionType ===
                                        TransactionType.Withdraw &&
                                        'Withdrawal'}
                                    {row.transactionType ===
                                        TransactionType.Purchase && 'Purchase'}
                                    {row.transactionType ===
                                        TransactionType.Sell && 'Sell'}
                                </TableCell>
                                <TableCell align="right">
                                    {formatCurrency(row.transactionAmount)}
                                </TableCell>
                                <TableCell align="right">
                                    {formatCurrency(
                                        row.beforeTransactionBalance
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {formatCurrency(
                                        row.afterTransactionBalance
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
