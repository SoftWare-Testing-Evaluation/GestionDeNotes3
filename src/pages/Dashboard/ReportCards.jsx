


import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert-with-buttons';
import "../../styles/Dashboard/students.css";
import { students } from "../../assets/lordicons/index.js";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import { Skeleton, Tooltip } from "@mui/material";
import Button from "../../components/Button/Button.jsx";
import { Download, RefreshOutlined } from "@mui/icons-material";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchElevesParClasse } from "../../slices/eleveSlice"; 
import { loadClasses } from '../../slices/classSlice';
import { loadMatieresByClasse } from '../../slices/matiereSlice.js';
import { loadNotesByMatiereAndClasse } from '../../slices/noteSlice';
import { loadDispensations } from '../../slices/dispenserSlice';


import { loadEnseignants } from '../../slices/enseignantSlice';
import { useReactToPrint } from "react-to-print";
import SNMSelect from "../../components/SNMSelect/SNMSelect.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

const ReportCards = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const contentRef = useRef(null);
    
    const handlePrint = useReactToPrint({ contentRef });
    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY'));
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const students = useSelector((state) => state.eleves.eleves);
    const matieres = useSelector((state) => state.matieres.matieres);
    const notes = useSelector((state) => state.notes.notes);
    const dispensations = useSelector((state) => state.dispensations.dispensations);

    useEffect(() => {
        dispatch(loadClasses());
        dispatch(loadDispensations());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClassId && year) {
            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
            dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
        }
    }, [selectedClassId, year, dispatch]);

    useEffect(() => {
        if (selectedStudent && year) {
            matieres.forEach(matiere => {
                dispatch(loadNotesByMatiereAndClasse({ idMatiere: matiere.id, idClasseEtude: selectedClassId, annee: year.year() }));
            });
        }
    }, [selectedStudent, matieres, selectedClassId, year, dispatch]);

    const refresh = async () => {
        setIsRefreshing(true);
        try {
            await dispatch(loadDispensations());
            await dispatch(loadClasses());
            if (selectedClassId && year) {
                await dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
                await dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement :", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleStudentChange = (event, newValue) => {
        console.log("Étudiant sélectionné :", newValue); // Vérifiez ce qui est sélectionné
        setSelectedStudent(newValue);
    };
    

    const getCoefficient = (matiereId) => {
        const dispensation = dispensations.find(d => d.idMatiere === matiereId && d.idClasseEtude === selectedClassId);
        return dispensation ? dispensation.coefficient : 0;
    };

    return (
        <div className="students">
            <div className="container">
                <DashboardHeader 
                    admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} 
                    handleLogout={() => localStorage.removeItem('token')} 
                    isRefreshing={isRefreshing} 
                    icon={reportCard} 
                    title={`Bulletin de l'élève ${selectedStudent ? selectedStudent.nom : ''}`} 
                />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions !w-auto">
                        <Button text={"Rafraîchir"} bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} />
                    </div>
                </div>

                <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%]">
                    <SNMSelect label={'Classe'} placeholder={'Choisir la classe'} options={classes} handleChange={setSelectedClassId} />
                    <SNMSelect label={'Élève'} placeholder={'Choisir l\'élève'} options={students} handleChange={setSelectedStudent}  isStudentSelect={true} />
                    <div className="ml-auto w-[30%]">
                                            <p className="text-secondary font-bold">Année</p>
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
                    {/* <Button text={"Imprimer"} onClick={handlePrint} /> */}
                    <div className="flex items-center justify-center bg-emerald-300 hover:bg-emerald-400 [&>*]:hover:text-white ease-in-out duration-300 hover:scale-110 cursor-pointer py-5 px-10" onClick={handlePrint}>
                                            <Download className="text-emerald-800  !w-[35px] !h-[35px] " />
                                            <span className="text-3xl font-bold">Imprimer</span>
                                        </div>
                </div>

                <div className="data">
                    {isRefreshing ?
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
                                    <tr className="[&>*]:uppercase">
                                        <th>Matière/enseignant</th>
                                        <th>Séquence</th>
                                        <th>Coef</th>
                                        <th>Total</th>
                                        <th>Compétences</th>
                                        <th>Visa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Matières Littéraires */}
                                    <tr>
                                        <td colSpan="6" className="!bg-secondary text-white">Matières Littéraires</td>
                                    </tr>
                                    {notes.filter(note => note.idEleve === selectedStudent?.id).map((note, index) => {
                                        const matiere = matieres.find(m => m.id === note.idMatiere);
                                        if (matiere && matiere.groupe === 1) {
                                            return (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">{matiere.nom}</td>
                                                    <td>{note.seq1}</td>
                                                    <td>{getCoefficient(note.idMatiere)}</td>
                                                    <td>{note.total}</td>
                                                    <td>{note.competence}</td>
                                                    <td>{note.visa}</td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Matières Scientifiques */}
                                    <tr>
                                        <td colSpan="6" className="!bg-secondary text-white">Matières Scientifiques</td>
                                    </tr>
                                    {notes.filter(note => note.idEleve === selectedStudent?.id).map((note, index) => {
                                        const matiere = matieres.find(m => m.id === note.idMatiere);
                                        if (matiere && matiere.groupe === 2) {
                                            return (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">{matiere.nom}</td>
                                                    <td>{note.seq1}</td>
                                                    <td>{getCoefficient(note.idMatiere)}</td>
                                                    <td>{note.total}</td>
                                                    <td>{note.competence}</td>
                                                    <td>{note.visa}</td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Matières Complémentaires */}
                                    <tr>
                                        <td colSpan="6" className="!bg-secondary text-white">Matières Complémentaires</td>
                                    </tr>
                                    {notes.filter(note => note.idEleve === selectedStudent?.id).map((note, index) => {
                                        const matiere = matieres.find(m => m.id === note.idMatiere);
                                        if (matiere && matiere.groupe === 3) {
                                            return (
                                                <tr key={index}>
                                                    <td className="flex flex-col items-center">{matiere.nom}</td>
                                                    <td>{note.seq1}</td>
                                                    <td>{getCoefficient(note.idMatiere)}</td>
                                                    <td>{note.total}</td>
                                                    <td>{note.competence}</td>
                                                    <td>{note.visa}</td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ReportCards;