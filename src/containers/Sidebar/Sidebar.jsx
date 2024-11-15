import React, { useRef, useState } from 'react'
import './sidebar.css'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Player } from '@lordicon/react';
import { dashboard, home, teacher, user } from '../../assets/lordicons';
import { classLinks, generateRef, mainLinks, onPlayPress, sidebarCriteria } from '../../utils/utilities.jsx';

const Sidebar = () => {
    const ref1 = useRef(1)
    const ref2 = useRef(2)
    const ref3 = useRef(3)
    const ref4 = useRef(4)
    const ref5 = useRef(5)
    const params = useParams()
    const [path, setPath] = useState(window.location.pathname)
    const [paths, setPaths] = useState(mainLinks([generateRef(1, useRef), generateRef(2, useRef), generateRef(3, useRef), generateRef(4, useRef)]))
    const location = useLocation();
    const { hash, pathname, search } = location;

    useEffect(() => {
        // console.log('Called!')
        console.log(pathname)
        setPath(window.location.pathname)
        if (sidebarCriteria(pathname)) {
            setPaths(classLinks([ref1, ref2, ref3, ref4, ref5]))
        }
        else {
            setPaths(mainLinks([ref1, ref2, ref3, ref4]))
        }
        // console.log(bg)
    }, [pathname])

    return (
        <main className={`sidebar ${sidebarCriteria(pathname) ? 'bg-primary' : 'bg-secondary'}`}>
            <nav className="nav">
                <ul>
                    {
                        paths.map((item, index) => (
                            // <li key={index} style={path === '/dashboard/admin' ? {margin:'1.5em 0'}:{}}>
                            <li key={index} className='text-gray-200' onMouseEnter={() => onPlayPress(item.ref)}>
                                <NavLink to={item.link} activeclassname='active' className={sidebarCriteria(pathname) ? 'hover:text-secondary' : 'hover:text-primary'}>{item.name}</NavLink>
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
            {
                sidebarCriteria(pathname) &&
                <Link to={'/dashboard'} className='flex items-center justify-center fixed top-[100px] left-5 text-white text-2xl hover:!text-secondary '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                    <span className='ml-2'>Back</span>
                </Link>
            }
        </main>
    )
}

export default Sidebar