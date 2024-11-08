import React from 'react'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='flex flex-col gap-4'>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout