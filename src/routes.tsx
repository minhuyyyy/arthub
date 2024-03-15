import { lazy } from 'react';
import Layout from './Layout/Layout';
import LoginPage from './auth/Login';
import CardDetails from './components/ArtworkCard/CardDetails';
import Loadable from './components/Loadable';
import BuyArtworkPage from './components/Pages/BuyArtwork';
import ChangePassword from './components/Pages/ChangePassword';
import CreatePost from './components/Pages/CreatePost';
import EditProfilePage from './components/Pages/EditProfile';
import UserHomePage from './components/Pages/Home';
import NewPassword from './components/Pages/NewPassword';
import PreOrdersPage from './components/Pages/PreOrders';
import ProfilePage from './components/Pages/Profile';
import ReportPage from './components/Pages/Report';
import UploadArtwork from './components/Pages/UploadArtwork';
import ProtectedRoute from './components/ProtectedRoute';
import { Roles } from './types/user';
import AdminBalancePage from './components/Pages/AdminBalancePage';
import SearchResult from './components/Pages/SearchResult';
import BalancePage from './components/Pages/balance';

const NotFound = Loadable(lazy(() => import('./auth/NotFound')));
const Register = Loadable(lazy(() => import('./auth/Register')));
const UserTable = Loadable(
    lazy(() => import('./components/Tables/OrderTable'))
);
const routes = [
    {
        path: '/',
        element: <Layout />,
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
                    // {
                    //     path: 'new-password',
                    //     element: (
                    //         <ProtectedRoute role={Roles.user}>
                    //             <NewPassword />
                    //         </ProtectedRoute>
                    //     ),
                    // },
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
            {
                path: 'balance',
                element: (
                    <ProtectedRoute role={Roles.user}>
                        <BalancePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'search/:searchStr',
                element: <SearchResult />,
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
            {
                path: 'balance',
                element: <AdminBalancePage />,
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
        path: 'report-page',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <ReportPage />,
            },
        ],
    },

    { path: '/session/signup', element: <Register /> },
    { path: '/session/signin', element: <LoginPage /> },
    { path: '/session/404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
];
export default routes;
