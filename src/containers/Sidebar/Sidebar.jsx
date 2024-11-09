import React, { useRef, useState } from 'react'
import './sidebar.css'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Player } from '@lordicon/react';
import { dashboard, home, teacher, user } from '../../assets/lordicons';
import { onPlayPress } from '../../utils/utilities.jsx';

const Sidebar = () => {
    const params = useParams()
    const [path, setPath] = useState(window.location.pathname)
    const [paths, setPaths] = useState([
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: dashboard,
            ref: useRef(1)
        },
        {
            name: 'Classes',
            link: '/classes',
            icon: home,
            ref: useRef(2)
        },
        {
            name: 'Enseignants',
            link: '/teachers',
            icon: teacher,
            ref: useRef(3)
        },
        {
            name: 'Profile',
            link: '/dashboard/admin_setting',
            icon: user,
            ref: useRef(4)
        },
    ]
    )

    useEffect(() => {
        // console.log('Called!')
        // console.log(path)
        setPath(window.location.pathname)
        // console.log(bg)
    }, [params])

    return (
        <main className="sidebar bg-secondary">
            <nav className="nav">
                <ul>
                    {
                        paths.map((item, index) => (
                            // <li key={index} style={path === '/dashboard/admin' ? {margin:'1.5em 0'}:{}}>
                            <li key={index} className='text-white' onMouseEnter={() => onPlayPress(item.ref)}>
                                <NavLink to={item.link} activeclassname='active'>{item.name}</NavLink>
                                <div className="icon cursor-pointer">
                                    <Player
                                        ref={item.ref}
                                        icon={item.icon}
                                        size={40}
                                    />
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