import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite/dist/flowbite.css';
import  { router } from './Router/Router.jsx'
import {

  RouterProvider,
} from "react-router-dom";
import AuthProvider, { AuthContext } from './provider/AuthProvider.jsx';

import {



  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
 <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
 </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
