// AuthProvider.js
import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Roles, User } from '../types/user';
import { decodeToken } from '../hooks/useJWT';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState: User = {
    userInfo: {
        id: 0,
        fullName: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        address: '',
        imageUrl: '',
        role: Roles.guest,
    },
    isInitialised: false,
    isAuthenticated: false,
};

const setSession = (accessToken: string) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                isInitialised: true,
                userInfo: action.payload.userInfo,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                userInfo: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userInfo: initialState.userInfo,
            };
        default:
            return state;
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: (email: string, password: string) => {},
    logout: () => {},
    register: (
        email: string,
        fullname: string,
        password: string,
        confirmPassword: string
    ) => {},
});

export const AuthProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    // Check for token in local storage on mount
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            const decoded = decodeToken(accessToken);
            const user = {
                id: decoded.MemberId,
                email: decoded.email,
                role: parseInt(decoded.Role),
            };
            dispatch({
                type: 'INIT',
                payload: { userInfo: user, isAuthenticated: true },
            });
        } else {
            dispatch({
                type: 'INIT',
                payload: { userInfo: initialState, isAuthenticated: false },
            });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await axios
                .post(`${API_URL}/login`, {
                    emailAddress: email,
                    accountPassword: password,
                })
                .then((res) => {
                    if (res.status === 200) {
                        const { token } = res.data;
                        const decoded = decodeToken(token);
                        setSession(token);
                        const user = {
                            id: decoded.MemberId,
                            email: decoded.email,
                            role: parseInt(decoded.Role),
                            fullName: decoded.FullName,
                        };
                        user;

                        toast.success('Login successfully!');
                        dispatch({ type: 'LOGIN', payload: { user } });
                        navigate('/');
                    }
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        toast.error('Invalid email or password');
                    } else toast.error('Something went wrong @@');
                });
        } catch (error) {
            // console.error(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const register = async (
        email: string,
        fullname: string,
        password: string,
        confirmPassword: string
    ) => {
        await axios
            .post(`${API_URL}/register`, {
                emailAddress: email,
                fullName: fullname,
                password: password,
                confirmPassword: confirmPassword,
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Account registered successfully!');
                    navigate('/session/signin');
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data);
                } else {
                    toast.error(err.response.data);
                }
            });
    };

    return (
        <>
            <AuthContext.Provider
                value={{ ...state, method: 'JWT', login, logout, register }}
            >
                {children}
            </AuthContext.Provider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    );
};

export default AuthContext;
