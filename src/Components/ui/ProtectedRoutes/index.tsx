import * as React from 'react'
import Home from '../../../pages/home'
import Login from '../../../pages/login'
import Signup from '../../../pages/signup'
import MyPhotos from '../../../pages/myphotos'
import Error from '../../../pages/error'
import Post from '../../../pages/post'
import Profile from '../../../pages/profile'
import { Navigate, Outlet,useLocation } from 'react-router-dom'

interface IProtectedRoutesProps  {

}

const ProtectedRoutes : React.FunctionComponent <IProtectedRoutesProps> = (props)=>{
    const isAuth :boolean = true;
    const location = useLocation()
    return isAuth?(<Outlet/>):(<Navigate to =  "/login" state={{ from:location }}/>);
}

export default ProtectedRoutes