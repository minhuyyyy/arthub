import { useEffect, useState } from 'react';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
import { ArtworkType } from '../../types/artwork';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import AppSuspense from '../Suspense';
import { getUserBalance } from '../../services/BalanceServices/balanceServices';
import {
    buyArtwork,
    getArtworkById,
} from '../../services/artworkServices/artworkServices';

export default function CheckOut() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sufficient, isSufficient] = useState<boolean>(false);
    const [artwork, setArtwork] = useState<ArtworkType>(null);
    const [balance, setBalance] = useState<number>(0);
    const { userInfo } = useAuth();

    const checkSufficient = () => {
        if (balance >= artwork.price) {
            isSufficient(true);
        } else isSufficient(false);
    };

    const getBalance = async () => {
        const res = await getUserBalance(userInfo.id);
        if (res.status === 200) {
            setBalance(res.data.balance);
        }
    };

    const getArtwork = async () => {
        const res = await getArtworkById(id!);
        if (res.status === 200) {
            setArtwork(res.data);
        }
    };

    useEffect(() => {
        if (artwork) {
            checkSufficient();
        }
    }, [balance, artwork]);

    useEffect(() => {
        getBalance();
        getArtwork();
    }, []);
    // if (!location.state) return <Navigate to={'/'} />;

    // const { cart: cartTmp, prevRes } = location.state;
    // const cart = cartTmp.map((item) => ({
    //     ...item,
    //     discount: typeof item.discount === 'undefined' ? 0 : item.discount,
    // }));

    // const totalItemPrice = cart
    //     .reduce((total, cartItem) => total + parseFloat(cartItem.price), 0)
    //     .toFixed(2);
    // const totalItemDiscount = cart
    //     .reduce((total, cartItem) => total + parseFloat(cartItem.discount), 0)
    //     .toFixed(2);
    // const totalCost = (totalItemPrice - totalItemDiscount).toFixed(2);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff0000',
            },
        },
    });

    const handleConfirm = async () => {
        await buyArtwork(
            userInfo.id,
            1,
            artwork.price,
            artwork.artworkId,
            artwork.price
        );
    };

    return (
        <AppSuspense>
            <div className="CheckOut">
                {artwork && (
                    <>
                        <div className="content">
                            <div>
                                <div
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        marginTop: '2rem',
                                    }}
                                >
                                    Order Details
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '20px',
                                    }}
                                >
                                    <table style={{ width: '100%' }}>
                                        <tr>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                        </tr>
                                        <tr>
                                            <td>{artwork.name}</td>
                                            <td>
                                                <img
                                                    src={artwork.image}
                                                    style={{
                                                        width: '100px',
                                                        height: '100%',
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                {artwork.price.toLocaleString(
                                                    'vi-VN',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '1rem 0 2.5rem',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '700',
                                        }}
                                    >
                                        Total
                                    </div>
                                    <div
                                        style={{
                                            color: '#FF0000',
                                            fontSize: '22px',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {artwork.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>
                                <ThemeProvider theme={theme}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                borderRadius: '20px',
                                            }}
                                            onClick={handleConfirm}
                                            disabled={!sufficient}
                                        >
                                            Confirm Checkout
                                        </Button>
                                    </div>
                                </ThemeProvider>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppSuspense>
    );
}
