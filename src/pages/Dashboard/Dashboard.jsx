import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../components/Typography/Typography.jsx';
import { Logout } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader.jsx';
import { Skeleton, Tooltip } from '@mui/joy';
import { BarChart, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import '../../styles/Dashboard/dashboard.css';
import { folderOrange, teacher } from '../../assets/lordicons/index.js';
import { Player } from '@lordicon/react';
import { useDispatch, useSelector } from 'react-redux';
import { classes, onPlayPress } from '../../utils/utilities.jsx';
import { useNavigate } from 'react-router-dom';
import { loadEnseignants } from '../../slices/enseignantSlice';
import { loadClasses } from '../../slices/classSlice';
import { fetchElevesParClasse } from '../../slices/eleveSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const enseignants = useSelector((state) => state.enseignants.enseignants);
    const classesData = useSelector((state) => state.classes.classes);
    const { eleves, elevesParClasse } = useSelector((state) => state.eleves);
    const navigate = useNavigate();
    const tRefs = useRef(10);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Charger les enseignants et les classes lors du montage du composant
    useEffect(() => {
        dispatch(loadEnseignants());
        dispatch(loadClasses());
    }, [dispatch]);

    // Charger les élèves par classe lors de la sélection d'une année
    useEffect(() => {
        classesData.forEach(classe => {
            dispatch(fetchElevesParClasse({ idClasseEtude: classe.id, annee: selectedYear }));
        });
    }, [selectedYear, classesData, dispatch]);

    const handleLogout = () => {
        setIsLogingOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/');
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
                            <Player ref={tRefs} icon={teacher} size={40} />
                        </div>
                        <div className="content">
                            <Typography text={'Enseignants'} className='title !text-white' />
                            <Typography text={`${enseignants.length} +`} className='number !text-white' />
                        </div>
                    </aside>

                    <Typography text={'Classes'} className='title text-3xl font-bold text-primary ' />

                    {/* Champ pour sélectionner l'année */}
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="year-selector"
                    >
                        {[2023, 2024, 2025].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <section className="numbers">
                        {
                            classesData.map((classe) => {
                                const studentCount = elevesParClasse[classe.id] || 0;

                                return (
                                    <aside className="card min-w-[300px]" key={classe.id} onClick={() => {
                                        localStorage.setItem('class', classe.nom);
                                        navigate('/students');
                                    }}>
                                        <div className="icon cursor-pointer">
                                            <Player icon={folderOrange} size={40} />
                                        </div>
                                        <div className="content">
                                            <Typography text={classe.nom} className='title' />
                                            <Typography text={`${studentCount} élèves`} className='number' />
                                        </div>
                                    </aside>
                                );
                            })
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
                                            data: classesData.map(classe => ({
                                                nom: classe.nom,
                                                valeur: eleves.filter(eleve => eleve.idClasseEtude === classe.id && eleve.anneeInscription === selectedYear).length,
                                            })),
                                            arcLabel: (item) => `(${item.valeur})`,
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
    );
};

export default Dashboard;