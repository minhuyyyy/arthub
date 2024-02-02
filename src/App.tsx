import { CssBaseline } from '@mui/material';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './fake-db';

function App() {
    const content = useRoutes(routes);
    return (
        <>
            <AuthProvider>
                <CssBaseline>{content}</CssBaseline>
            </AuthProvider>
        </>
    );
}

export default App;
