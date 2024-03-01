import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Roles, User, getRoleKey } from '../types/user';
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

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

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
        case 'INIT': {
            const { email, password } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                isInitialised: true,
                email,
                password,
            };
        }

        case 'LOGIN': {
            const { user } = action.payload;

            return { ...state, user };
        }

        case 'LOGOUT': {
            return { ...state, isAuthenticated: false, user: null };
        }

        case 'REGISTER': {
            const { user } = action.payload;

            return { ...state, isAuthenticated: true, user };
        }

        default:
            return state;
    }
};

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const login = async (email: string, password: string) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
                emailAddress: email,
                accountPassword: password,
            },
        );
        if (response.status === 200) {
            const { token } = response.data;
            const decoded = decodeToken(token);
            setSession(token);
            const user: User = {
                userInfo: {
                    id: decoded.MemberId,
                    email: decoded.email,
                    role: parseInt(decoded.Role),
                },
                isAuthenticated: true,
                isInitialised: true,
            };
            dispatch({ type: 'LOGIN', payload: { user } });
            navigate('/');
        }
    };

    const register = async (
        email: string,
        username: string,
        password: string,
    ) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        });
        const { user } = response.data;

        dispatch({ type: 'REGISTER', payload: { user } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/auth/profile');
                dispatch({
                    type: 'INIT',
                    payload: { isAuthenticated: true, user: data.user },
                });
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INIT',
                    payload: { isAuthenticated: false, user: null },
                });
            }
        })();
    }, []);

    // SHOW LOADER
    if (!state.isInitialised) return <Loading />;

    return (
        <AuthContext.Provider
            value={{ ...state, method: 'JWT', login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
