import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalStyle } from './styles/GlobalStyle';
import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from 'react-redux';
import store from './Redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                    <App />
            </ChakraProvider>
        </Provider>
        <GlobalStyle />
    </React.StrictMode>,
);
