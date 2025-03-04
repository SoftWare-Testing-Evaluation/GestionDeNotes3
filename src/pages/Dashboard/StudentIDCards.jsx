import React, { useEffect, useState, useRef } from "react";
import "../../styles/Dashboard/studentidgcards.css";
import { students } from "../../assets/lordicons/index.js";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Download, RefreshOutlined } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { loadClasses } from "../../slices/classSlice";
import { fetchElevesParClasse } from "../../slices/eleveSlice";
import SNMSelect from "../../components/SNMSelect/SNMSelect.jsx";
import Button from "../../components/Button/Button.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import logo from '../../assets/logo.jpeg'
import StudentCard from "../../components/carteIdentite/StudentCard.jsx";


const StudentIDCards = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
        const [isLogingOut, setIsLogingOut] = useState(false);
     const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const studentsData = useSelector((state) => state.eleves.eleves);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY'));
    const [selectedClass, setSelectedClass] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const contentRef = useRef();

    const handlePrint = useReactToPrint({contentRef})
        

    useEffect(() => {
        dispatch(loadClasses());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClassId) {
            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
        }
        const selectedClass = classes.find(c => c.id === selectedClassId);
        setSelectedClass(selectedClass);
    }, [selectedClassId, year, dispatch]);

    /* useEffect(() => {
        const filtered = studentsData.filter(student => student.idClasseEtude === selectedClassId);
        setFilteredStudents(filtered);
    }, [studentsData, selectedClassId]); */
    
    const refresh = async () => {
        setIsRefreshing(true);
        try {
            await dispatch(loadClasses());
            
            
            if (selectedClassId) {
                dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
            }
            /* const filtered = studentsData.filter(student => student.idClasseEtude === selectedClassId);
        setFilteredStudents(filtered); */
        const selectedClass = classes.find(c => c.id === selectedClassId);
        setSelectedClass(selectedClass);
        } catch (error) {
            console.error("Erreur lors du rafraîchissement :", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleLogout = () => {
        setIsLogingOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/');
        }, 2000);
    };

    return (
        <div className="students">
            <div className="container">
                <DashboardHeader 
                    admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} 
                    handleLogout={handleLogout}
                    isLogingOut={isLogingOut}
                    isRefreshing={isRefreshing} 
                    icon={students} 
                    title={`Impression des cartes d'identité`} 
                    count={classes.length}
                />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions !w-auto">
                        <Button text={"Rafraîchir"} bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} />
                    </div>
                    <div className="actions !w-auto">
                        <Button text="Imprimer" handler={handlePrint} />
                    </div>
                </div>
               

                <div className="flex my-5 p-3 !justify-between bg-orange-200 w-[95%]">
                
                    <div className="ml-auto w-[30%]">
                    <SNMSelect label={'Classe'} placeholder={'Choisir la classe'} options={classes} handleChange={setSelectedClassId} />
                   </div>
                   
                    <div className="ml-auto w-[15%]">
                        <p className="text-secondary font-bold"> Année </p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                views={['year']}
                                value={year}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setYear(newValue);
                                        localStorage.setItem('year', newValue.year());
                                    }
                                }}
                                renderInput={(params) => <input {...params} className="year-selector"/>}
                            />
                        </LocalizationProvider>
                    </div>
                    
                </div>
        
                <div className="data" >
                    {isRefreshing ?
                        <div>
                            <Skeleton variant="rectangular" width='200%' height={55} />
                            <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                {
                                    Array.apply(null, { length: 25 }).map((value, index) =>
                                        <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                    )
                                }
                            </div>
                        </div> :
                        <div className="flex flex-wrap justify-between w-full">
                        {studentsData.length > 0 ? (
                            studentsData.map((student, index) => (
                                <div key={student.id} className="w-[48%] mb-[5px] mr-[2%]"> {/* Adjust width for two columns */}
                                    <StudentCard 
                                        students={[student]} // Pass a single student as an array
                                        logo={logo} 
                                        selectedClasse={selectedClass ? selectedClass : ''} 
                                        anneeprecedent={year.year() - 1} 
                                        annee={year.year()} 
                                        user={user} 
                                    />
                                </div>
                            ))
                        ) : (
                            <Typography text="Aucun élève trouvé pour cette classe." />
                        )}
                    </div>
                    }
                </div>
                
            </div>

            {/* Section d'impression */}
            <div style={{ display: "none" }}>
                <div className="py-5" ref={contentRef} style={{ fontSize: "1.5rem", padding: "1.5rem" }}>
                    
                    <div  className="data">
                        {isRefreshing ?
                                <div>
                                    <Skeleton variant="rectangular" width='200%' height={55} />
                                    <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                        {
                                            Array.apply(null, { length: 25 }).map((value, index) =>
                                                <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                            )
                                        }
                                    </div>
                                </div> :<div className="flex flex-wrap justify-between w-full">
                        {studentsData.length > 0 ? (
                            studentsData.map((student, index) => (
                                <div key={student.id} className="w-[48%] mb-[5px] mr-[2%]"> {/* Adjust width for two columns */}
                                    <StudentCard 
                                        students={[student]} // Pass a single student as an array
                                        logo={logo} 
                                        selectedClasse={selectedClass ? selectedClass : ''} 
                                        anneeprecedent={year.year() - 1} 
                                        annee={year.year()} 
                                        user={user} 
                                    />
                                </div>
                            ))
                        ) : (
                            <Typography text="Aucun élève trouvé pour cette classe." />
                        )}
                    </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentIDCards;
