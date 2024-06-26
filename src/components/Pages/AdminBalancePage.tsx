import {
    Button,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
    formatCurrency,
    formatDataStandard,
} from '../../utils/helper/format.helper';
import { API_URL } from '../../utils/urls';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';

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

export default function AdminBalancePage() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        redirect('/');
        return;
    }
    const [balance, setBalance] = useState<Balance | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchResult, setSearchResult] = useState(null);
    // const fetchBalance = async () => {
    //     const response = await axios.get(`${API_URL}/balance/` + userId);
    //     setBalance(response.data);
    // };
    const DebounceInput = () => {
        const [searchStr, setSearchStr] = useState<string>('');
        useDebounce(
            async () => {
                if (searchStr) {
                    await axios
                        .get(`${API_URL}/admin/account?userEmail=${searchStr}`)
                        .then((res) => {
                            if (res.status === 200) {
                                setSearchResult(res.data.accountId);
                            }
                            return axios.get(
                                `${API_URL}/balance/${searchResult}`
                            );
                        })
                        .then((balanceRes) => {
                            if (balanceRes.status === 200) {
                                setBalance(balanceRes.data);
                            }
                            return axios.post(`${API_URL}/balance/history`, {
                                accountId: searchResult,
                            });
                        })
                        .then((transactionRes) => {
                            if (transactionRes.status === 200) {
                                setTransactions(transactionRes.data);
                            }
                        })
                        .catch((err) => {
                            setBalance(null);
                            setTransactions([]);
                            toast.error(err.response.statusText);
                        });
                }
            },
            [searchStr],
            1000
        );
        const handleSearch = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setSearchStr(e.target.value);
        return (
            <div>
                <form>
                    <Input
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            paddingLeft: '10px',
                        }}
                        disableUnderline
                        placeholder="Enter email:"
                        type="email"
                        onChange={(e) => handleSearch(e)}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        );
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <DebounceInput />
            {balance && <BalanceComponent balance={balance.balance} />}
            <TransactionComponent transactions={transactions} />
        </div>
    );
}
const BalanceComponent = ({ balance }: { balance: number }) => {
    return (
        <div>
            <h2>Current balance</h2>
            <p>{formatCurrency(balance)}</p>
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
