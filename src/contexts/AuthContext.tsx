// AuthProvider.js
import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Roles, User } from '../types/user';
import { decodeToken } from '../hooks/useJWT';
import { useNavigate } from 'react-router-dom';

const initialState: User = {
    userInfo: {
        id: '',
        username: '',
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
    login: () => {},
    logout: () => {},
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
        const response = await axios.post(`${API_URL}/login`, {
            emailAddress: email,
            accountPassword: password,
        });
        if (response.status === 200) {
            const { token } = response.data;
            const decoded = decodeToken(token);
            setSession(token);
            const user = {
                id: decoded.MemberId,
                email: decoded.email,
                role: parseInt(decoded.Role),
            };
            console.log(user);

            dispatch({ type: 'LOGIN', payload: { user } });
            navigate('/');
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
        const response = await axios.post(`${API_URL}/register`, {
            emailAddress: email,
            fullName: fullname,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (response.status === 200) {
            navigate('/session/signin');
        }
    };

    // SHOW LOADER
    // if (!state.isInitialised) return <Loading />;

    return (
        <AuthContext.Provider
            value={{ ...state, method: 'JWT', login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
