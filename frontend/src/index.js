import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { configStore } from './redux/middlewares/configStore';
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from './Context/SocketContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
root.render(
  <React.StrictMode>
    <Provider store={configStore}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
          <Toaster position='top-right'/> 
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
