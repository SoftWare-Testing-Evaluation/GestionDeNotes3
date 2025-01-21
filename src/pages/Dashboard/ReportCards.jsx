
import React, { useEffect, useState, useRef,useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const contentRef = useRef(null);
    
    const handlePrint = useReactToPrint({ contentRef });
    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY'));
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSequence, setSelectedSequence] = useState('seq1'); // Valeur par défaut
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const students = useSelector((state) => state.eleves.eleves);
    const matieres = useSelector((state) => state.matieres.matieres);
    const [allNotes, setAllNotes] = useState([]); // État pour stocker toutes les notes
    const dispensations = useSelector((state) => state.dispensations.dispensations);
    const enseignants = useSelector((state) => state.enseignants.enseignants);
    const sequenceOptions = [
        { id: 'seq1', nom: 'Séquence 1' },
        { id: 'seq2', nom: 'Séquence 2' },
        { id: 'seq3', nom: 'Séquence 3' },
        { id: 'seq4', nom: 'Séquence 4' },
        { id: 'seq5', nom: 'Séquence 5' },
        { id: 'seq6', nom: 'Séquence 6' },
    ];

    useEffect(() => {
        dispatch(loadClasses());
        dispatch(loadEnseignants());
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
            console.log("nom de l'élève  :",selectedStudent.nom);
            const notesPromises = matieres.map(matiere => 
                dispatch(loadNotesByMatiereAndClasse({ idMatiere: matiere.id, idClasseEtude: selectedClassId, annee: year.year() }))
            );
    
            Promise.all(notesPromises).then((results) => {
                const newNotes = results.flatMap(result => result.payload); // Extraire le payload
                console.log("Nouvelles notes :", newNotes); // Log des nouvelles notes
                setAllNotes(newNotes); // Remplacez les anciennes notes
            }).catch(error => {
                console.error("Erreur lors du chargement des notes :", error);
            });
        }
    }, [selectedStudent, matieres, selectedClassId, year, dispatch]);

    const refresh = async () => {
        setIsRefreshing(true);
        try {
            await dispatch(loadClasses());
            await dispatch(loadEnseignants());
            await dispatch(loadDispensations());
            
            if (selectedClassId && year) {
                await dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
                await dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
                setAllNotes([]); // Réinitialiser les notes pour éviter les doublons
            }
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
        }, 1000);
    };
    const getCompetence = (note) => {
        if (note < 10 ||note === undefined || note === null || note === '') {
            return 'N/A';
        } else if (note < 14) {
            return 'ECA';
        } else if (note < 18) {
            return 'A';
        } else {
            return 'A+';
        }
    };

    const filteredNotes = useMemo(() => {
        return allNotes.filter(note => note.idEleve === selectedStudent?.id);
    }, [allNotes, selectedStudent]);

    const renderNotes = (groupe) => {
        return filteredNotes.filter(note => matieres.find(m => m.id === note.idMatiere && m.groupe === groupe)).map((note, index) => {
            const matiere = matieres.find(m => m.id === note.idMatiere);
            const dispenser = matiere?.Dispensers[0]; // Récupérer le premier dispenser
            const enseignant = enseignants.find(e => e.id === dispenser?.idEnseignant); // Trouver l'enseignant par ID
            const competence = getCompetence(note[selectedSequence]); // Utiliser la séquence sélectionnée 
            const noteValue = note[selectedSequence]; // Récupérer la valeur de la note
            const coefficient = getCoefficient(note.idMatiere);
    
            // Vérifier si la note est valide pour le calcul du total
            const total = (noteValue !== undefined && noteValue !== null && noteValue !== '') 
                ? noteValue * coefficient 
                : '---'; // Remplacer par '-' si la note est absente
    
            return (
                <tr key={index}>
                    <td className="flex flex-col items-center">
                        {matiere?.designation || 'Matière inconnue'} <br />
                        {enseignant ? `${enseignant.nom} ${enseignant.prenom}` : 'Enseignant inconnu'}
                    </td>
                    <td>{noteValue !== undefined && noteValue !== null ? noteValue : 'N/A'}</td> {/* Afficher la note ou 'N/A' */}
                    <td>{coefficient}</td>
                    <td>{total}</td> {/* Afficher le total ou '-' */}
                    <td>{competence}</td>
                    <td>{note.visa || 'N/A'}</td>
                </tr>
            );
        });
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
                    handleLogout={handleLogout}
                    isLogingOut={isLogingOut}
                    isRefreshing={isRefreshing} 
                    icon={reportCard} 
                    title={`Bulletin de l'élève ${selectedStudent ? selectedStudent.nom : ''}`} 
                    count={filteredNotes.length}
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
                        <SNMSelect 
                            label={'Séquence'} 
                            placeholder={'Choisir la séquence'} 
                            options={sequenceOptions} 
                            handleChange={setSelectedSequence} 
                        />
                    </div>
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
                                {renderNotes(1)}

                                {/* Matières Scientifiques */}
                                <tr>
                                    <td colSpan="6" className="!bg-secondary text-white">Matières Scientifiques</td>
                                </tr>
                                {renderNotes(2)}

                                {/* Matières Complémentaires */}
                                <tr>
                                    <td colSpan="6" className="!bg-secondary text-white">Matières Complémentaires</td>
                                </tr>
                                {renderNotes(3)}
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