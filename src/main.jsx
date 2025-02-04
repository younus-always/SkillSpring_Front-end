import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './provider/AuthProvider.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
