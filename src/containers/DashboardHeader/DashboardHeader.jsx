import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../components/Loader/Loader.jsx'
import Typography from '../../components/Typography/Typography.jsx'
import { Skeleton, Tooltip } from '@mui/joy';
import { Player } from '@lordicon/react'
import { Logout } from "@mui/icons-material";
import { onPlayPress } from '../../utils/utilities.jsx'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = ({ admin, handleLogout, isLogingOut, isRefreshing, icon, title, count, classe }) => {
    const iconRef = useRef(null)
    const navigate = useNavigate()
    const [text, setText] = useState(classe ? title + ' en classe de ' + classe : title)
    useEffect(() => {
        if (classe)
            setText(title + ' en classe de ' + classe)
    }, [classe, title])
    return (
        <>
            <header>
                <div className="texts">
                    {
                        admin === null ?
                            <Skeleton variant="rectangular" width='100%' height={25} /> :
                            <Typography text={`Hi ${admin}`} />
                    }
                    <Typography text={text} className='title' />
                </div>

                <Tooltip title='Logout' placement='top'>
                    <div className='logout ease-in-out duration-300 hover:scale-105' onClick={handleLogout}>
                        {
                            isLogingOut ?
                                <Loader size='25px' /> :
                                <Logout className='text-[#cb1313]' />
                        }
                    </div>
                </Tooltip>
            </header>
            <section className="stats">
                <section className="numbers">
                    {

                        isRefreshing ?
                            <Skeleton variant="rectangular" width='100%' height={100} /> :

                            <aside className="products !bg-secondary !h-auto" onMouseEnter={() => onPlayPress(iconRef)}>
                                <div className="icon cursor-pointer">
                                    <Player
                                        ref={iconRef}
                                        icon={icon}
                                        size={40}
                                    />
                                </div>
                                <div className="content">
                                    <Typography text={text} className='title !text-white' />
                                    <Typography text={`Nombre de lignes: ${count}`} className='number !text-white' />
                                </div>
                            </aside>
                    }
                </section>
            </section>
        </>
    )
}

export default DashboardHeader