import * as React from 'react'
import SideBar from '../sidebar'

interface ILayoutProps  {}

const Layout :React.FunctionComponent<ILayoutProps>=()=> {
  return (
    <div className='flex gap-x-4 bg-white'>
<aside className='flex gap-x-4 bg-gray-300 fixed top-0 left-0 z-40 lg:w-40'></aside>
<div></div>
<aside></aside>
    </div>
  )
}

export default Layout