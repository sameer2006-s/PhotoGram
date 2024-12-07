import { createBrowserRouter } from "react-router-dom";
import Login from './pages/login'
import Signup from './pages/signup'
import Error from './pages/error'
import Myphotos from './pages/myphotos'
import Profile from './pages/profile'
import Home from './pages/home'
import Post from './pages/post'
import ProtectedRoutes from './Components/ProtectedRoutes'
import ErrorBoundary from "./ErrorBoundary";





const router = createBrowserRouter([
    {
        path:"/",
        element:<Login/>,
    },
    {
        element:<ProtectedRoutes/>,
        errorElement:<ErrorBoundary/>,
        children:[
            {
                path:"/post",
                element:<Post/>,
                errorElement:<Error/>
            },
            {
                path:"/home",
                element:<Home/>,
                errorElement:<Error/>
            },
            {
                path:"/myphotos",
                element:<Myphotos/>,
                errorElement:<Error/>
            },
            {
                path:"/profile",
                element:<Profile/>,
                errorElement:<Error/>
            },
        ]
    },
    {
        path:"/login",
        element:<Login/>,
        errorElement:<Error/>
    },
    {
        path:"/signup",
        element:<Signup/>,
        errorElement:<Error/>
    },
    

])
export default router