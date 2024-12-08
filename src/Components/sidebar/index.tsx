import {  BellIcon, CirclePlusIcon,  HomeIcon, Icon, ImagesIcon, LogOut, SettingsIcon, UserRoundIcon } from 'lucide-react/'
import * as React from 'react'
import { Link ,useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../ui/button'
import { getAuth } from 'firebase/auth'
import { useUserAuth } from '../../context/userAuthContext'


interface ISideBarProps  {}

const navItems = [
    {
        name:"Home",
        link:"/home",
        icon:HomeIcon
    },
    {
        name:"Add Photos",
        link:"/post",
        icon: CirclePlusIcon
    },
    {
        name:"My Photos",
        link:"/myphotos",
        icon:ImagesIcon
    },
    {
        name:"Notifications",
        link:"#",
        icon:BellIcon
    },
    {
        name:"Profile",
        link:"/profile",
        icon:UserRoundIcon
    },
     {
        name:"Direct",
        link:"#",
        icon:HomeIcon
    },
    {
       name:"Settings",
       link:"#",
       icon:SettingsIcon
   }
]

const SideBar :React.FunctionComponent<ISideBarProps>=()=> {
    const {pathname}= useLocation()
    const {logOut} = useUserAuth()

    const handleLogOut = async ()=>{
        try {
            const result = await logOut()
            console.log('user logged out',result)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <nav className='flex flex-col  relative h-screen max-w-sm w-full'>
        <div className='flex justify-center m-5'>
            <div className='text-white text-lg'>PhotoGram</div>
        </div>
        {navItems.map((item)=>(<div key={item.name} className={cn(buttonVariants({variant:"default"}),pathname===item.link ? 'bg-white text-white-800 hover:bg-white rounded-none':'hover:bg-slate-950 hover:text-white bg-transparent rounded-none','justify-start')}>
            
            <Link to={item.link} className='flex'>
            <span>
                    {React.createElement(item.icon, { 
                        className: 'w-5 h-5 mr-2',
                        style: { filter :` ${pathname===item.link?"invert(0)":"invert(1)"}`,color:'black' }
                    })}
                </span>
                <span>
                <div className={pathname === item.link?"text-black":"text-white"}>{item.name}</div>
                </span>
               
            </Link>
         </div>))}
         <div className={cn(buttonVariants({variant:"default"}),pathname==='/login' ? 'bg-white text-white-800 hover:bg-white rounded-none':'hover:bg-slate-950 hover:text-white bg-transparent rounded-none','justify-start')}>
            
            <Link to='/login' className='flex' onClick={handleLogOut}>
                <span>
                    <LogOut style={{color: 'white'}} className='hover:bg-slate-950 hover:text-white bg-transparent rounded-none justify-start w-5 h-5 mr-2'/>
                </span>
                <span>
                <div className={pathname === '/login'?"text-black":"text-white"}>LogOut</div>
                </span>
               
            </Link>
         </div>
    </nav>
)
}

export default SideBar