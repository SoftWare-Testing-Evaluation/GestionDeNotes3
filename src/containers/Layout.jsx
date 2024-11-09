import React from 'react'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar.jsx'

const Layout = () => {
    return (
        <main className='flex flex-col gap-4'>
            <Header />
            <div className='relative flex w-full items-end justify-end mt-[80px]'>
                <Sidebar />
                <Outlet />
            </div>
        </main>
    )
}

export default Layout