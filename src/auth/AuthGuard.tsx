import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactElement } from 'react';

const AuthGuard = ({ children }: { children: ReactElement }) => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();

    if (isAuthenticated) return <>{children}</>;

    return (
        <Navigate
            replace
            to='/session/signin'
            state={{ from: pathname }}
        />
    );
};

export default AuthGuard;
