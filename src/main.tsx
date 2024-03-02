import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider>
            <BrowserRouter>
                {/* <CookiesProvider> */}
                <App />
                {/* </CookiesProvider> */}
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>,
);
