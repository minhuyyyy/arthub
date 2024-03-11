import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StyledEngineProvider>
);
