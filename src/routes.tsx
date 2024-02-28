import { lazy } from 'react';
import Loadable from './components/Loadable';
import AuthGuard from './auth/AuthGuard';
import LoginPage from './auth/Login';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import UserHomePage from './components/Pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';
import Create from './components/Pages/Create';

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
                path: '',
                element: (
                    // <ProtectedRoute role={Roles.user}>
                    <UserHomePage />
                    // </ProtectedRoute>
                ),
            },
            {
                path: 'create',
                element: <Create />,
            },
            // {path:'create',element:}
        ],
    },
    {
        path: 'admin',
        element: (
            <ProtectedRoute role={Roles.admin}>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard/user',
                element: <UserTable />,
            },
        ],
    },

    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
