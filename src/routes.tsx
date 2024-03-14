import { lazy } from 'react';
import Layout from './Layout/Layout';
import LoginPage from './auth/Login';
import Loadable from './components/Loadable';
import UserHomePage from './components/Pages/Home';
import ProfilePage from './components/Pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';
import CardDetails from './components/ArtworkCard/CardDetails';
import EditProfilePage from './components/Pages/EditProfile';
import PreOrdersPage from './components/Pages/PreOrders';
import BuyArtworkPage from './components/Pages/BuyArtwork';
import UploadArtwork from './components/Pages/UploadArtwork';
import CreatePost from './components/Pages/CreatePost';
import ChangePassword from './components/Pages/ChangePassword';
import NewPassword from './components/Pages/NewPassword';
import BalancePage from './components/Pages/Balance';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/OrderTable'))
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
                path: 'create-post',

                element: (
                    <ProtectedRoute role={Roles.user}>
                        <CreatePost />,
                    </ProtectedRoute>
                ),
            },
            {
                path: 'upload-artwork',

                element: (
                    <ProtectedRoute role={Roles.user}>
                        <UploadArtwork />,
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
                        path: 'change-password',
                        element: (
                            <ProtectedRoute role={Roles.user}>
                                <ChangePassword />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'new-password',
                        element: (
                            <ProtectedRoute role={Roles.user}>
                                <NewPassword />
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
            {
                path: 'buy/:id',
                element: (
                    <ProtectedRoute role={Roles.user}>
                        <BuyArtworkPage />
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
    {
        path: 'balance',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <BalancePage />,
            },
        ],
    },

    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
