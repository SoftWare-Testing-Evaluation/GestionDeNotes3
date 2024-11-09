import React, { useState } from 'react'
import Typography from '../../components/Typography/Typography.jsx';
import { Logout } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader.jsx';
import { Skeleton, Tooltip } from '@mui/joy';
import { BarChart, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import '../../styles/Dashboard/dashboard.css'
import { home } from '../../assets/lordicons/index.js';

const Dashboard = () => {
    const user = 'Essi Junior'
    const [isLogingOut, setIsLogingOut] = useState(false);
    const cards = [
        {
            id: 0,
            label: 'Admins',
            icon: home,
            value: 10
        },
        {
            id: 1,
            label: 'Students',
            icon: home,
            value: 10
        },
        {
            id: 2,
            label: 'Teachers',
            icon: home,
            value: 10
        },
        {
            id: 3,
            label: 'Notes',
            icon: home,
            value: 10
        },
        {
            id: 4,
            label: 'Absences',
            icon: home,
            value: 10
        }
    ]

    return (

        <main className='admin-dashboard bg-white'>
            <div className="container">
                <header>
                    <div className="texts">
                        {
                            user === null ?
                                <Skeleton variant="rectangular" width='100%' height={25} /> :
                                <Typography text={`Hi ${user}, welcome to your dashboard`} className={'text-xl font-medium'} />
                        }
                        <Typography text={'Dashboard'} className='title' isGradient/>
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
                            cards.map(card => (
                                <aside className="card" key={card.id}>
                                    <div className="icon">
                                        <lord-icon
                                            src={`https://cdn.lordicon.com/${card.icon}`}
                                            trigger="hover"
                                            className='lord-icon'
                                            style={{ width: '50px', height: '50px' }}>
                                        </lord-icon>
                                    </div>
                                    <div className="content">
                                        <Typography text={card.label} className='title' />
                                        <Typography text={card.value + '+'} className='number' />
                                    </div>
                                </aside>
                            ))
                        }
                    </section>
                    <section className="graphs">
                        <Typography text={'Charts'} isGradient={true} style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 700 }} />
                        <div className="graphs-content">
                            <aside className="pie">
                                <PieChart
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    series={[
                                        {
                                            data: cards,
                                            arcLabel: (item) => `(${item.value})`,
                                        }
                                    ]}
                                />
                            </aside>
                            <aside className="line">
                                <BarChart
                                    series={[
                                        { data: [35, 44, 24] },
                                        { data: [51, 6, 49] },
                                        { data: [15, 25, 10] },
                                        { data: [30, 50, 10] },
                                        { data: [15, 25, 10] },
                                    ]}
                                    xAxis={[{ data: ['s1', 's2', 's3'], scaleType: 'band' }]}
                                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                />
                            </aside>

                        </div>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Dashboard