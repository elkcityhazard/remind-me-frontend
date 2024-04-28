import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './NotFound.jsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import { Signup } from './signup/Signup.jsx';
import { Activation } from './pages/user/activation/Activation.jsx';
import { Home } from './Home.jsx';
import { SignupSuccess } from './pages/signup/success/Success';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App><Home /></App>,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <App><Signup /></App>,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup/success",
        element: <App><SignupSuccess /></App>,
        errorElement: <ErrorPage />
    },
    {
        path: "/user/activation",
        element: <App><Activation /></App>,
        errorElement: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
