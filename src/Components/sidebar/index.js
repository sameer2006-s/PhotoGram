import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BellIcon, CirclePlusIcon, HomeIcon, ImagesIcon, LogOut, SettingsIcon, UserRoundIcon } from 'lucide-react/';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';
import { useUserAuth } from '../../context/userAuthContext';
const navItems = [
    {
        name: "Home",
        link: "/home",
        icon: HomeIcon
    },
    {
        name: "Add Photos",
        link: "/post",
        icon: CirclePlusIcon
    },
    {
        name: "My Photos",
        link: "/myphotos",
        icon: ImagesIcon
    },
    {
        name: "Notifications",
        link: "#",
        icon: BellIcon
    },
    {
        name: "Profile",
        link: "/profile",
        icon: UserRoundIcon
    },
    {
        name: "Direct",
        link: "#",
        icon: HomeIcon
    },
    {
        name: "Settings",
        link: "#",
        icon: SettingsIcon
    }
];
const SideBar = () => {
    const { pathname } = useLocation();
    const { logOut } = useUserAuth();
    const handleLogOut = async () => {
        try {
            const result = await logOut();
            console.log('user logged out', result);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (_jsxs("nav", { className: 'flex flex-col  relative h-screen max-w-sm w-full', children: [_jsx("div", { className: 'flex justify-center m-5', children: _jsx("div", { className: 'text-white text-lg', children: "PhotoGram" }) }), navItems.map((item) => (_jsx("div", { className: cn(buttonVariants({ variant: "default" }), pathname === item.link ? 'bg-white text-white-800 hover:bg-white rounded-none' : 'hover:bg-slate-950 hover:text-white bg-transparent rounded-none', 'justify-start'), children: _jsxs(Link, { to: item.link, className: 'flex', children: [_jsx("span", { children: React.createElement(item.icon, {
                                className: 'w-5 h-5 mr-2',
                                style: { filter: ` ${pathname === item.link ? "invert(0)" : "invert(1)"}`, color: 'black' }
                            }) }), _jsx("span", { children: _jsx("div", { className: pathname === item.link ? "text-black" : "text-white", children: item.name }) })] }) }, item.name))), _jsx("div", { className: cn(buttonVariants({ variant: "default" }), pathname === '/login' ? 'bg-white text-white-800 hover:bg-white rounded-none' : 'hover:bg-slate-950 hover:text-white bg-transparent rounded-none', 'justify-start'), children: _jsxs(Link, { to: '/login', className: 'flex', onClick: handleLogOut, children: [_jsx("span", { children: _jsx(LogOut, { style: { color: 'white' }, className: 'hover:bg-slate-950 hover:text-white bg-transparent rounded-none justify-start w-5 h-5 mr-2' }) }), _jsx("span", { children: _jsx("div", { className: pathname === '/login' ? "text-black" : "text-white", children: "LogOut" }) })] }) })] }));
};
export default SideBar;
