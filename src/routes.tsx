import { lazy } from 'react';
import Layout from './Layout/Layout';
import LoginPage from './auth/Login';
import Loadable from './components/Loadable';
import Create from './components/Pages/Create';
import UserHomePage from './components/Pages/Home';
import ProfilePage from './components/Pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';
import CardDetails from './components/ArtworkCard/CardDetails';
import EditProfilePage from './components/Pages/EditProfile';
import PreOrdersPage from './components/Pages/PreOrders';
// import PreOrderModal from './components/Modals/PreOrderModal';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/Table'))
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
                    <ProtectedRoute role={Roles.user}>
                        <Create />,
                    </ProtectedRoute>
                ),
            },
            { path: 'card/:id', element: <CardDetails /> },
            {
                path: 'profile',
                element: <Layout />,
                children: [
                    {
                        path: ':userId',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'edit-profile/:userId',
                        element: (
                            <ProtectedRoute role={Roles.user}>
                                <EditProfilePage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'pre-orders',
                        element: (
                            <ProtectedRoute role={Roles.user}>
                                <PreOrdersPage />
                            </ProtectedRoute>
                        ),
                    },
                ],
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
    // {
    //     path: 'profile',
    //     element: (
    //         <AuthGuard>
    //             <Layout />
    //         </AuthGuard>
    //     ),
    //     children: [
    //         {
    //             path: ':userId',
    //             element: <ProfilePage />,
    //         },
    //     ],
    // },

    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
