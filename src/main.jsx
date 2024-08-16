import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/Home';

import { HelmetProvider } from 'react-helmet-async';
import Login from './Pages/Login & Register/Login';
import Register from './Pages/Login & Register/Register';
import ContextComponent from './Context/ContextComponent';
import ErrorPage from './Pages/Shared/ErrorPage';
import PrivateRoute from './Pages/Private/PrivateRoute';


//tan stack query_____________________________________
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AllProperties from './Pages/Private/AllProperties';
import Details from './Pages/Private/Details';
import Root from './Pages/Root/Root';
import UserProfile from './Pages/Private/UserProfile';





const queryClient = new QueryClient()
//tan stack query ______________________________


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage/>,
    children:[
    {
      index: true,
      element: <Home></Home>
    },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path: "/allProperties",
        element: <PrivateRoute><AllProperties/></PrivateRoute>,
        loader: () => fetch("http://localhost:5000/productCount")
      },
      {
        path: "/productDetails/:id",
        element: <PrivateRoute><Details/></PrivateRoute>
      },
      {
        path: '/dashboard/userProfile',
        element: <PrivateRoute><UserProfile/></PrivateRoute>
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
              <ContextComponent>
                <RouterProvider router={router} />
              </ContextComponent>
        </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
