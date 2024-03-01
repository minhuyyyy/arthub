import { CssBaseline } from '@mui/material';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './fake-db';
import { ToastContainer } from 'react-toastify';
function App() {
    const content = useRoutes(routes);
    return (
        <>
            <AuthProvider>
                <CssBaseline>{content}</CssBaseline>

                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                />
            </AuthProvider>
        </>
    );
}

export default App;
