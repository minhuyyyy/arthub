import { lazy } from 'react';
import Loadable from './components/Loadable';
import AuthGuard from './auth/AuthGuard';
import LoginPage from './auth/Login';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import UserHomePage from './components/Pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/UsersTable')),
);
const routes = [
    {
        path: '/',
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: 'admin',
                element: (
                    <ProtectedRoute role={Roles.admin}>
                        <UserTable />,
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/',
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                path: 'home',
                element: (
                    <ProtectedRoute role={Roles.user}>
                        <UserHomePage />,
                    </ProtectedRoute>
                ),
            },
        ],
    },

    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '/', element: <Navigate to='admin/dashboard/users' /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
