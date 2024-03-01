import { lazy } from 'react';
import Loadable from './components/Loadable';
import AuthGuard from './auth/AuthGuard';
import LoginPage from './auth/Login';
import Layout from './Layout/Layout';
import UserHomePage from './components/Pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';
import Create from './components/Pages/Create';
import CardDetails from './components/ArtworkCard/CardDetails';
import PreOrderModal from './components/Modals/PreOrderModal';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/UsersTable')),
);
const routes = [
    {
        path: '/',
        element: (
            // <AuthGuard>
            <Layout />
            // </AuthGuard>
        ),
        children: [
            {
                path: '',
                element: <UserHomePage />,
            },
            {
                path: 'create',

                element: (
                    <ProtectedRoute role={Roles.guest}>
                        <Create />,
                    </ProtectedRoute>
                ),
            },
            { path: 'card/:_id', element: <CardDetails /> },

            {
                path: 'pre-order',
                element: (
                    <ProtectedRoute role={Roles.user}>
                        <PreOrderModal />
                    </ProtectedRoute>
                ),
            },
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
