import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Roles, User } from '../types/user';

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

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

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
            // if (user) {
            return { ...state, isAuthenticated: true, user };
            // } else return { ...state };
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

    const login = async (email: string, password: string) => {
        // const response = await axios.post('/api/auth/login', {
        //     email,
        //     password,
        // });
        // // if (response.status === 200) {
        // const { user } = response.data;
        dispatch({ type: 'LOGIN', payload: { email, password } });
        // }
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
