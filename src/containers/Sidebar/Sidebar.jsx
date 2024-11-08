import React, { useState } from 'react'
import './sidebar.css'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Sidebar = () => {
    const primary = '#990000';

    const params = useParams()
    const [path, setPath] = useState(window.location.pathname)
    const [paths, setPaths] = useState([])
    const [bg, setBg] = useState(primary)

    const admin = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: 'heexevev'
        },
        {
            name: 'Classes',
            link: '/classes',
            icon: 'mebvgwrs'
        },
        {
            name: 'Enseignants',
            link: '/teachers',
            icon: 'piolrlvu'
        },
        {
            name: 'Matières',
            link: '/subjects',
            icon: 'cosvjkbu'
        },
        {
            name: 'Elèves',
            link: '/students',
            icon: 'pcllgpqm'
        },
        {
            name: 'Heures d\'absence',
            link: '/penalties',
            icon: 'egmlnyku'
        },
        {
            name: 'Profile',
            link: '/dashboard/admin_setting',
            icon: 'lecprnjb'
        },
    ]

    useEffect(() => {
        // console.log('Called!')
        // console.log(path)
        setPath(window.location.pathname)
        // console.log(bg)
        switch (window.location.pathname) {
            case '/dashboard/merchant':
                setPaths(merchant)
                break;
            case '/dashboard/products':
                setPaths(merchant)
                break;
            case '/dashboard/merchant_setting':
                setPaths(merchant)
                break;
            case '/dashboard/admin':
                setBg(primary)
                setPaths(admin)
                break;
            case '/dashboard/admins':
                setBg('rgb(2, 178, 175)')
                setPaths(admin)
                break;
            case '/dashboard/clients':
                setPaths(admin)
                setBg('rgb(46, 150, 255)')
                break;
            case '/dashboard/products_admin':
                setPaths(admin)
                setBg('rgb(184, 0, 216)')
                break;
            case '/dashboard/orders':
                setPaths(admin)
                setBg('rgb(96, 0, 155)')
                break;
            case '/dashboard/merchants':
                setPaths(admin)
                setBg('rgb(39, 49, 200)')
                break;
            case '/dashboard/admin_setting':
                setPaths(admin)
                setBg(primary)
                break;
        
            default:
                break;
        }
    }, [params])

    return (
        <main className="sidebar" style={{backgroundColor:bg}}>
            <nav className="nav">
                <ul>
                    {
                        paths.map((item, index) => (
                            // <li key={index} style={path === '/dashboard/admin' ? {margin:'1.5em 0'}:{}}>
                            <li key={index}>
                                <NavLink to={item.link} activeclassname='active'>{item.name}</NavLink>
                                <div className="icon">
                                    <lord-icon
                                        src={`https://cdn.lordicon.com/${item.icon}.json`}
                                        trigger="hover"
                                        className='lord-icon'
                                        style={{width:'25px', height:'25px', color:'white'}}>
                                    </lord-icon>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </main>
    )
}

export default Sidebar