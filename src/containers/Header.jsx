import React from 'react'

import logo from '../assets/logo.svg'
import Searchbar from '../components/SearchBar/SearchBar.jsx'
const Header = () => {
    return (
        <main className='flex !justify-between items-center bg-white py-2 px-4 w-full'>
            <img src={logo} alt="logo" className='w-14 h-14 object-cover object-center' />
            <Searchbar withFilter className={'w-1/2'} text={'Search'} />
        </main>
    )
}

export default Header