import { lazy } from 'react';
import Loadable from './components/Loadable';
import AuthGuard from './auth/AuthGuard';
import LoginPage from './auth/Login';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/UsersTable')),
);
const routes = [
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <Layout />
                {/* <UserTable /> */}
            </AuthGuard>
        ),
        children: [
            {
                path: 'users',
                element: <UserTable />,
            },
        ],
    },
    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '/', element: <Navigate to='dashboard/users' /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
