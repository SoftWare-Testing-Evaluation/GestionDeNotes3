import React, { useEffect, useRef,useState } from 'react';
import Typography from '../../components/Typography/Typography.jsx';
import { Logout } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader.jsx';
import { Skeleton, Tooltip } from '@mui/joy';
import { BarChart, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import '../../styles/Dashboard/dashboard.css';
import { folderOrange, teacher,home } from '../../assets/lordicons/index.js';
import { Player } from '@lordicon/react';
import { useDispatch, useSelector } from 'react-redux';
import { classes, onPlayPress } from '../../utils/utilities.jsx';
import { useNavigate } from 'react-router-dom';
import { loadEnseignants } from '../../slices/enseignantSlice';
import { loadClasses } from '../../slices/classSlice';
import { fetchElevesParClasse } from '../../slices/eleveSlice';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { calculerStatistiquesClasses } from '../../utils/calculerStatistiquesClasses.js'; // Assurez-vous d'importer la fonction

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const enseignants = useSelector((state) => state.enseignants.enseignants);
    const classesData = useSelector((state) => state.classes.classes);
    const { eleves, elevesParClasse } = useSelector((state) => state.eleves);
    const navigate = useNavigate();
    const tRefs = useRef(10);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const [selectedYear, setSelectedYear] = useState(dayjs(new Date().getFullYear(), 'YYYY')); // Utiliser dayjs ici
    const [selectedSequence, setSelectedSequence] = useState('seq1'); // État pour la séquence
    const [classStatistics, setClassStatistics] = useState([]); // État pour stocker les statistiques

    const sequenceOptions = [
        { id: 'seq1', nom: 'Séquence 1' },
        { id: 'seq2', nom: 'Séquence 2' },
        { id: 'seq3', nom: 'Séquence 3' },
        { id: 'seq4', nom: 'Séquence 4' },
        { id: 'seq5', nom: 'Séquence 5' },
        { id: 'seq6', nom: 'Séquence 6' },
    ];
    // Charger les enseignants et les classes lors du montage du composant
    useEffect(() => {
        dispatch(loadEnseignants());
        dispatch(loadClasses());
    }, [dispatch]);

    // Charger les élèves par classe lors de la sélection d'une année
    useEffect(() => {
        const newElevesParClasse = {};
        classesData.forEach(classe => {
            dispatch(fetchElevesParClasse({ idClasseEtude: classe.id, annee: selectedYear.year() })) // Utiliser selectedYear.year()
                .then((eleves) => {
                    newElevesParClasse[classe.id] = eleves.length;
                });
        });
        dispatch({ type: 'UPDATE_ELEVES_PAR_CLASSE', payload: newElevesParClasse });
    }, [selectedYear, classesData, dispatch]);

    // Charger les statistiques de classe lorsque l'année ou la séquence est sélectionnée
    useEffect(() => {
        if (classesData.length > 0) {
            const fetchStatistics = async () => {
                const statistics = await calculerStatistiquesClasses(dispatch, classesData, selectedYear.year(), selectedSequence);
                setClassStatistics(statistics);
                console.log(classStatistics);
            };
            fetchStatistics();
        }
    }, [selectedYear, selectedSequence, classesData, dispatch]);
     // Exemple de données de test
 /*    const classess = ['Sixième (6e)','Cinquième (5e)','Quatrième (4e)','Troisième (3e)','Seconde (2nde)','Première (1ere)', 'Terminale (Tle)']
     const statistiques = [
        { Id: 1, value: 0,ref: useRef(0),label: classess[0],
            icon: home, },
        { Id: 2, value: 20, ref: useRef(1),label:classess[1],
            icon: home,},
        { Id: 3, value: 40,ref: useRef(2),label:classess[2],
            icon: home, },
        {Id: 4, value: 60,ref: useRef(3),label: classess[3],
            icon: home,},
        {Id: 5, value: 80, ref: useRef(4),label:classess[4],
            icon: home,},
        { Id: 6, value: 100 ,ref: useRef(5),label: classess[5],
            icon: home,},
    ];
    const pieData = statistiques.map(stat => ({
        Id: stat.Id,
        value: stat.value,
    }));*/
    

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
                    <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%] ">
                <div className="ml-auto w-[30%]">

                    {/* Champ pour sélectionner l'année avec un calendrier */}
                    <p className="text-secondary font-bold">Année</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Sélectionnez une année"
                            views={['year']}
                            value={selectedYear} // Utiliser dayjs pour l'affichage
                            onChange={(newValue) => {
                                if (newValue) {
                                    setSelectedYear(newValue); // Mettre à jour avec l'objet dayjs
                                }
                            }}
                            renderInput={(params) => <input {...params} className="year-selector" />}
                        />
                    </LocalizationProvider>
                    </div>
                    <div className="ml-auto w-[40%]">
                            <p className="text-secondary font-bold">Séquence</p>
                            <select
                                value={selectedSequence}
                                onChange={(e) => setSelectedSequence(e.target.value)}
                                className="sequence-selector"
                            >
                                {sequenceOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.nom}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <section className="numbers">
                        {
                            classesData.map((classe) => {
                                const studentCount = elevesParClasse[classe.id] || 0;

                                return (
                                    <aside className="card min-w-[300px]" key={classe.id} onClick={() => {
                                        localStorage.setItem('class', classe.id);
                                        localStorage.setItem('year', selectedYear.year());
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
                                            fill: 'red',
                                            fontWeight: 'bold',
                                        }
                                    }}
                                    series={[
                                        {
                                            data: classStatistics,
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