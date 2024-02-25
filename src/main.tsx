import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider>
            <BrowserRouter>
                <Provider store={store}>
                    {/* <CookiesProvider> */}
                    <App />
                    {/* </CookiesProvider> */}
                </Provider>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>,
);
