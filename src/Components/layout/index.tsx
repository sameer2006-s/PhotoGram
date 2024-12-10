import * as React from 'react'
import SideBar from '../sidebar'
import UserList from '../userList'
import { Home } from 'lucide-react';

interface ILayoutProps  {
    children:React.ReactNode;
}

const Layout :React.FunctionComponent<ILayoutProps>=({children})=> {
  return (
    <div className='flex bg-white'>
<aside className='flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-40 h-screen'>
    <SideBar/>
</aside>
<div className='lg:ml-60 lg:mr-60 p-6 flex-1 ml-36'>{children}</div>
<aside className='hidden lg:block  gap-x-4 bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen'>
    <UserList/>
</aside>
    </div>
  )
}

export default Layout
// const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
//     return (
//       <div className="flex bg-white min-h-screen">
//         {/* Sidebar */}
//         <aside className="bg-gray-800 fixed top-0 left-0 z-40 lg:w-40 h-screen">
//           <SideBar />
//         </aside>
  
//         {/* Main Content */}
//         <div className="flex-1 flex justify-center items-center p-6">
//           {children}
//         </div>
  
//         {/* Right Sidebar */}
//         <aside className="hidden lg:block bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen">
//           <UserList />
//         </aside>
//       </div>
//     );
//   };
  
//   export default Layout;