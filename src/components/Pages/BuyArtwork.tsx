import { useEffect, useState } from 'react';
// import './CheckOut.scss';
import {
    Button,
    CircularProgress,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { BiLogoVisa, BiLogoMastercard, BiLogoPaypal } from 'react-icons/bi';
import { SiAmericanexpress } from 'react-icons/si';
import { FaCcDiscover } from 'react-icons/fa6';
import { AiOutlineLock } from 'react-icons/ai';
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/urls';
// import { postCheckout } from '../../../service/paymentService';
// import { useDispatch } from 'react-redux';
// import { saveToTmpList } from '../../../redux/slices/cartSlice';

export default function CheckOut() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(false);
    const [artwork, setArtwork] = useState(null);
    const getArtwork = async () => {
        const res = await axios.get(`${API_URL}/artwork/${id}`);
        if (res.status === 200) {
            setArtwork(res.data);
        }
    };

    useEffect(() => {
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
                main: '#FF6000',
            },
        },
    });

    // const handleConfirm = async () => {
    //     setLoading(true);
    //     const res = await postCheckout({
    //         userId: prevRes.userId,
    //         paymentMethod: 1,
    //         courseId: prevRes.courseId,
    //         totalPrice: prevRes.totalPrice,
    //         orderId: prevRes._id,
    //     });

    //     if (res.status === 200) {
    //         dispatch(saveToTmpList(cart));
    //         window.open(res.data.url, '_self');
    //     }

    //     setLoading(false);
    // };

    return (
        <div className="CheckOut">
            <div style={{ padding: '2rem 0 2.5rem 12%' }}>
                <div style={{ fontSize: '14px' }}>
                    <span
                        className="Home"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Home
                    </span>
                    / Checkout
                </div>
                <div
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginTop: '0.5rem',
                    }}
                >
                    Checkout
                </div>
            </div>
            <div className="content">
                <div className="PaymentMethod">
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '500' }}>
                            Select Payment Method
                        </div>
                        <div
                            style={{
                                width: '70px',
                                border: '1px solid #FF0000',
                                margin: '1.5rem 0',
                            }}
                        ></div>
                        <ThemeProvider theme={theme}>
                            <Button
                                variant={
                                    paymentSelected ? 'contained' : 'outlined'
                                }
                                style={{
                                    display: 'flex',
                                    gap: '0.3rem',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                                fullWidth
                                color="primary"
                                onClick={() => {
                                    setPaymentSelected(!paymentSelected);
                                }}
                            >
                                <BiLogoPaypal
                                    style={{
                                        fontSize: '24px',
                                        fontFamily: 'inherit',
                                    }}
                                />
                                Paypal
                            </Button>
                        </ThemeProvider>
                        <div
                            style={{
                                fontSize: '14px',
                                color: 'grey',
                                margin: '1.5rem 0 0.7rem',
                            }}
                        >
                            After payment via PayPal's secure checkout, we will
                            send you a link to download your files.
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.3rem',
                                alignItems: 'center',
                                paddingBottom: '1.5rem',
                                borderBottom: '1px solid #efebe9',
                            }}
                        >
                            <span style={{ fontSize: '14px', color: 'grey' }}>
                                PayPal accepts
                            </span>
                            <BiLogoVisa
                                style={{ fontSize: '40px', color: '#293688' }}
                            />
                            <BiLogoMastercard
                                style={{ fontSize: '40px', color: 'red' }}
                            />
                            <SiAmericanexpress
                                style={{ fontSize: '36px', color: '#306fc5' }}
                            />
                            <FaCcDiscover style={{ fontSize: '36px' }} />
                        </div>
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
                                width: '70px',
                                border: '1px solid #FF0000',
                                margin: '1.5rem 0 0.7rem',
                            }}
                        ></div>
                        {/* {cart?.map((cartItem, index) => (
                            <div key={index} className="cartItem">
                                <div
                                    className="info"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.8rem 0',
                                        borderBottom: '1px solid #e0e0e0',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                        }}
                                    >
                                        <img
                                            style={{
                                                aspectRatio: '16/9',
                                                width: '220px',
                                                borderRadius: '4px',
                                            }}
                                            src={cartItem?.imageUrl}
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div style={{ fontWeight: '500' }}>
                                            {cartItem?.title}
                                        </div>
                                        <div
                                            style={{
                                                color: '#FF0000',
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                marginBottom: '-5px',
                                            }}
                                        >
                                            $
                                            {(
                                                cartItem.price -
                                                cartItem?.discount
                                            ).toFixed(2)}
                                        </div>
                                        {cartItem.discount !== 0 && (
                                            <div
                                                style={{
                                                    color: 'grey',
                                                    fontSize: '14px',
                                                    textDecorationLine:
                                                        'line-through',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                ${(+cartItem.price).toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))} */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '1rem 0 2.5rem',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{ fontSize: '20px', fontWeight: '700' }}
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
                                100
                                {/* ${totalCost} */}
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
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        opacity: loading
                                            ? '0.4'
                                            : paymentSelected
                                            ? '1'
                                            : '0.4',
                                        fontFamily: 'inherit',
                                        pointerEvents: loading
                                            ? 'none'
                                            : paymentSelected
                                            ? 'auto'
                                            : 'none',
                                    }}
                                    startIcon={
                                        loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size="1rem"
                                                sx={{
                                                    fontSize: '10px',
                                                    width: '10px',
                                                    height: '10px',
                                                }}
                                            />
                                        ) : null
                                    }
                                    // onClick={handleConfirm}
                                >
                                    Confirm Checkout
                                </Button>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>

                <div className="OrderSummary">
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '500' }}>
                            Order Summary
                        </div>
                        <div
                            style={{
                                width: '70px',
                                border: '1px solid #FF0000',
                                margin: '1.2rem 0',
                            }}
                        ></div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#616161',
                                fontWeight: '500',
                            }}
                        >
                            <div style={{ fontWeight: '15px' }}>
                                Original price:
                            </div>
                            <div>$10000</div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#616161',
                                fontWeight: '500',
                                marginTop: '1.5rem',
                            }}
                        >
                            <div style={{ fontWeight: '15px' }}>Discount:</div>
                            <div>$0</div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '3rem',
                            }}
                        >
                            <div
                                style={{ fontWeight: '600', fontSize: '20px' }}
                            >
                                Total:
                            </div>
                            <div
                                style={{
                                    fontWeight: '700',
                                    fontSize: '20px',
                                    color: '#FF0000',
                                }}
                            >
                                $0
                            </div>
                        </div>
                        <div
                            style={{
                                color: '#bdbdbd',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                marginTop: '1rem',
                            }}
                        >
                            <AiOutlineLock />
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
