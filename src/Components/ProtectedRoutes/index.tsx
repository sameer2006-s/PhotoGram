import * as React from 'react'
import Home from '../../pages/home'
import Login from '../../pages/login'
import Error from '../../pages/error'
import Post from '../../pages/post'
import Profile from '../../pages/profile'
import { Navigate, Outlet,useLocation } from 'react-router-dom'
import { useUserAuth } from '../../context/userAuthContext'
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

interface IProtectedRoutesProps  {

}

const ProtectedRoutes : React.FunctionComponent <IProtectedRoutesProps> = (props)=>{
    const auth = getAuth()
    const [user,loading] = useAuthState(auth);
    const location = useLocation()
    if(loading) return <div>loading...</div>
    return user?(<Outlet/>):(<Navigate to =  "/login" state={{ from:location }}/>);
}

export default ProtectedRoutes