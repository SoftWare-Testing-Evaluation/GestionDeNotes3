import React, { useRef } from 'react'
import Loader from '../../components/Loader/Loader.jsx'
import Typography from '../../components/Typography/Typography.jsx'
import { Tooltip } from '@mui/joy'
import { Player } from '@lordicon/react'
import { Logout } from "@mui/icons-material";
import { onPlayPress } from '../../utils/utilities.jsx'

const DashboardHeader = ({ admin, handleLogout, isLogingOut, isRefreshing, icon, title, count }) => {
    const iconRef = useRef(null)
    return (
        <>
            <header>
                <div className="texts">
                    {
                        admin === null ?
                            <Skeleton variant="rectangular" width='100%' height={25} /> :
                            <Typography text={`Hi ${admin}`} />
                    }
                    <Typography text={title} className='title' />
                </div>

                <Tooltip title='Logout' placement='top'>
                    <div className='logout ease-in-out duration-300 hover:scale-105' onClick={(e) => handleLogout(e)}>
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

                            <aside className="products !bg-secondary" onMouseEnter={() => onPlayPress(iconRef)}>
                                <div className="icon cursor-pointer">
                                    <Player
                                        ref={iconRef}
                                        icon={icon}
                                        size={40}
                                    />
                                </div>
                                <div className="content">
                                    <Typography text={title} className='title !text-white' />
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