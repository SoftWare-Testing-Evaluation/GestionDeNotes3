import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/subjects.css";

import { useAlert } from 'react-alert-with-buttons'
//import { DeleteOutline, EditOutlined, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";
import { DeleteOutline, EditOutlined, KeyboardArrowDown, RefreshOutlined } from "@mui/icons-material";
import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import { onPlayPress } from "../../utils/utilities.jsx";
import { Option, Select } from '@mui/joy';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../components/ModalContainer.jsx";
import SubjectForm from "../../components/Forms/SubjectForm.jsx";
import {loadMatieresByClasse,deleteMatiere}from '../../slices/matiereSlice.js'
import { loadEnseignants } from '../../slices/enseignantSlice';
import { loadClasses } from '../../slices/classSlice';
const Subjects = () => {
    //State for translation
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const[isModalOpen,setIsModalOpen]=useState(false);

   
    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY')); // Utiliser dayjs ici
    const { user } = useSelector((state) => state.auth);
    const subjects = useSelector((state) => state.matieres.matieres);
    const classes = useSelector((state) => state.classes.classes);
    const enseignants = useSelector((state) => state.enseignants.enseignants);

     // Charger les enseignants et les classes lors du montage du composant
        useEffect(() => {
            dispatch(loadEnseignants());
            dispatch(loadClasses());
        }, [dispatch]);

    useEffect(() => {
        if (selectedClassId && year) {
            dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
        }
    }, [dispatch, selectedClassId, year]);

   

    

    const handleDelete = async (id) => {
        setIsRefreshing(true);
        try {
            await dispatch(deleteMatiere(id));
            alert.success("Matière supprimée avec succès !");
        } catch (error) {
            alert.error("Erreur lors de la suppression de la matière.");
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleLogout = () => {
        setIsLogingOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/');
        }, 1000);
    };
    const handleChange = (event, newValue) => {
        setSelectedClassId(newValue);
    };

    function TeacherRow({ id, designation,groupe, Dispensers }) {
         // Récupérer les noms des enseignants associés à cette matière
         const teachers = Dispensers.map(d => {
            const enseignant = enseignants.find(e => e.id === d.idEnseignant);
            return enseignant ? enseignant.nom : 'Inconnu';
        });
        return (
            <tr>
                <td>{id}</td>
                <td>{groupe}</td>
                <td>{Dispensers.length > 0 ? Dispensers[0].coefficient : 'N/A'}</td>
                <td>{designation}</td>
                <td>{teachers.join(', ')}</td> 
                <td className="option-buttons option flex items-center justify-center py-2 gap-2 ">
                    <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" />

                    <DeleteOutline className="bg-red-300 text-red-800 rounded-full p-2 hover:bg-red-400 hover:text-white !w-[35px] !h-[35px] ease-in-out duration-300 hover:scale-110 cursor-pointer" onClick={() =>
                        alert.open({
                            message: `Really delete, ${designation} ?`,
                            buttons: [
                                {
                                    label: "Yes",
                                    onClick: () => {
                                        handleDelete(id),
                                        alert.close()
                                    },
                                    style: {
                                        backgroundColor: "#990000",
                                        marginRight: "1rem",
                                        color: "white",
                                    },
                                },
                                {
                                    label: "No",
                                    onClick: () => {
                                        alert.close()
                                    },
                                },
                            ],
                        })}/>
                </td>
            </tr>
        );
    }

    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="subjects" >
            <div className="container">
                <DashboardHeader admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'}  handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Matières'} count={subjects.length} />
                <div className="flex !justify-between items-center w-[95%]">
                <div className="actions h-full">
                    <ModalContainer triggerText={'Nouveau'} formToDisplay={<SubjectForm onClose={()=> setIsModalOpen(false)} />} />

                    <Button text={"Rafraishir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={() => refresh} isLoading={isRefreshing} size={'25px'} />
                   
                    
                </div>
                <div style={{ marginRight:'5px'}} >
                        <p className="text-secondary font-bold">Classe</p>
                        <Select
                            placeholder={'Choisir la classe'}
                            indicator={<KeyboardArrowDown />}
                            onChange={handleChange}
                        >
                            {classes.map((elt, i) => (
                                <Option value={elt.id} key={i}>{elt.nom}</Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p className="text-secondary font-bold">Année</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Sélectionnez une année"
                                views={['year']}
                                value={year} // Utiliser dayjs pour l'affichage
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setYear(newValue); // Mettre à jour avec l'objet dayjs
                                        localStorage.setItem('year', newValue.year()); // Enregistrer l'année dans localStorage
                                    }
                                }}
                                renderInput={(params) => <input {...params} className="year-selector"/>}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
               
                <div className="data">
                    {
                        isRefreshing ?
                            <div>
                                <Skeleton variant="rectangular" width='100%' height={55} />
                                <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                    {
                                        Array.apply(null, { length: 25 }).map((value, index) =>
                                            <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                        )
                                    }
                                </div>
                            </div> :
                            <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Groupe</th>
                                        <th>Coefficient</th>
                                        <th>Matière</th>
                                        <th>Enseignants</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination data={subjects} 
                                    RenderComponent={({ id, designation, groupe, Dispensers }) => (
                                        <TeacherRow 
                                                id={id} 
                                                groupe={groupe}
                                                designation={designation} 
                                                Dispensers={Dispensers} // Assurez-vous que cela est correct
                                        />
        
                                        )}  
                                        pageLimit={1} dataLimit={5} tablePagination={true} />
                                </tbody>
                            </table>
                            </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default Subjects;
