import React, { useRef, useState } from 'react'
import Typography from '../../components/Typography/Typography.jsx';
import { Logout } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader.jsx';
import { Skeleton, Tooltip } from '@mui/joy';
import { BarChart, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import '../../styles/Dashboard/dashboard.css'
import { folder, folderOrange, folderRed, home, teacher } from '../../assets/lordicons/index.js';
import { Player } from '@lordicon/react';
import { useDispatch, useSelector } from 'react-redux';
import { classes, onPlayPress } from '../../utils/utilities.jsx';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth); // Récupérer les informations de l'utilisateur et le token
    const navigate = useNavigate()
    const tRefs = useRef(10);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const cards = [
        {
            id: 0,
            label: classes[0],
            icon: home,
            value: 10,
            ref: useRef(0)
        },
        {
            id: 1,
            label: classes[1],
            icon: home,
            value: 100,
            ref: useRef(1)
        },
        {
            id: 2,
            label: classes[2],
            icon: home,
            value: 80,
            ref: useRef(2)
        },
        {
            id: 3,
            label: classes[3],
            icon: home,
            value: 30,
            ref: useRef(3)
        },
        {
            id: 4,
            label: classes[4],
            icon: home,
            value: 50,
            ref: useRef(4)
        },
        {
            id: 5,
            label: classes[5],
            icon: home,
            value: 60,
            ref: useRef(5)
        },
        {
            id: 5,
            label: classes[6],
            icon: home,
            value: 30,
            ref: useRef(5)
        }
    ]
    const handleLogout = () => {
        setIsLogingOut(true);
        // Simulez une opération de déconnexion
        setTimeout(() => {
            localStorage.removeItem('token'); // Supprimez le token d'authentification
            navigate('/'); // Redirigez vers la page de connexion
        }, 1000);
    };

    return (

        <main className='admin-dashboard bg-white'>
            <div className="container">
                <header>
                    <div className="texts">
                        {
                            user === null ?
                                <Skeleton variant="rectangular" width='100%' height={25} /> :
                                <Typography text={`Hi ${user.nom} ${user.prenom}, welcome to your dashboard`} className={'text-xl font-medium'} />
                        }
                        <Typography text={'Dashboard'} className='title' isGradient />
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
                    <aside className="card !bg-secondary" onMouseEnter={() => onPlayPress(tRefs)}>
                        <div className="icon cursor-pointer">
                            <Player
                                ref={tRefs}
                                icon={teacher}
                                size={40}
                            />
                        </div>
                        <div className="content">
                            <Typography text={'Enseignants'} className='title !text-white' />
                            <Typography text={'32' + '+'} className='number !text-white' />
                        </div>
                    </aside>

                    <Typography text={'Classes'} className='title text-3xl font-bold text-primary ' />
                    <section className="numbers">
                        {
                            cards.map((card, index) => (
                                <aside className="card min-w-[300px]" key={card.id} onMouseEnter={() => onPlayPress(card.ref)} onClick={() => {
                                    localStorage.setItem('class', card.label)
                                    navigate('/students')
                                }}>
                                    <div className="icon cursor-pointer">
                                        <Player
                                            ref={card.ref}
                                            icon={index % 2 === 0 ? folderRed : folderOrange}
                                            size={40}
                                        />
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
                        <div className="graphs-content flex flex-wrap">
                            <aside className="pie flex flex-col gap-2 !px-5">
                                <Typography text='Statistiques de l’année scolaire' className={'text-xl'} />
                                <PieChart
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    series={[
                                        {
                                            data: cards,
                                            arcLabel: (item) => `(${item.value})`,
                                        }
                                    ]}
                                />
                            </aside>
                            <aside className="line flex flex-col gap-2 !px-5">
                                <Typography text='Statistiques par trimestre par classe' className={'text-xl'} />
                                <BarChart
                                    series={[
                                        { data: [35, 44, 24, 23, 23] },
                                        { data: [51, 6, 49, 23, 23] },
                                        { data: [15, 25, 10, 23, 23] },
                                        { data: [30, 50, 10, 23, 23] },
                                        { data: [15, 25, 10, 23, 23] },
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