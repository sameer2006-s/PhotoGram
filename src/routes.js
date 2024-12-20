import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Error from './pages/error';
import Myphotos from './pages/myphotos';
import Profile from './pages/profile';
import Home from './pages/home';
import ProtectedRoutes from './Components/ProtectedRoutes';
import ErrorBoundary from "./ErrorBoundary";
import CreatePost from "./pages/post";
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Login, {}),
    },
    {
        element: _jsx(ProtectedRoutes, {}),
        errorElement: _jsx(ErrorBoundary, {}),
        children: [
            {
                path: "/post",
                element: _jsx(CreatePost, {}),
                errorElement: _jsx(Error, {})
            },
            {
                path: "/home",
                element: _jsx(Home, {}),
                errorElement: _jsx(Error, {})
            },
            {
                path: "/myphotos",
                element: _jsx(Myphotos, {}),
                errorElement: _jsx(Error, {})
            },
            {
                path: "/profile",
                element: _jsx(Profile, {}),
                errorElement: _jsx(Error, {})
            },
        ]
    },
    {
        path: "/login",
        element: _jsx(Login, {}),
        errorElement: _jsx(Error, {})
    },
    {
        path: "/signup",
        element: _jsx(Signup, {}),
        errorElement: _jsx(Error, {})
    },
]);
export default router;
