import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SideBar from '../sidebar';
import UserList from '../userList';
const Layout = ({ children }) => {
    return (_jsxs("div", { className: 'flex bg-white', children: [_jsx("aside", { className: 'flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-40 h-screen', children: _jsx(SideBar, {}) }), _jsx("div", { className: 'lg:ml-60 lg:mr-60 p-6 flex-1 ml-36', children: children }), _jsx("aside", { className: 'hidden lg:block  gap-x-4 bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen', children: _jsx(UserList, {}) })] }));
};
export default Layout;
