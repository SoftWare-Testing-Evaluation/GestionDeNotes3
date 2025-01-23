import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/students.css";

import { useAlert } from 'react-alert-with-buttons'
import { DeleteOutline, EditOutlined, KeyboardArrowDown, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import {  onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { Option, Select, selectClasses } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ModalContainer from "../../components/ModalContainer.jsx";
import { loadEnseignants } from '../../slices/enseignantSlice';
import { loadClasses } from '../../slices/classSlice';
import { loadMatieresByClasse } from '../../slices/matiereSlice.js';
import {loadNotesByMatiereAndClasse, deleteNote,addNote,updateNote} from '../../slices/noteSlice.js'
import { loadDispensations } from '../../slices/dispenserSlice';
import { fetchElevesParClasse } from "../../slices/eleveSlice"; // Importez cette a
import NoteForm from "../../components/Forms/NoteForm.jsx";

const Notes = () => {
    //State for translation
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // 'success' ou 'error'
    
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY'));
    const [selectedMatiereId, setSelectedMatiereId] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const matieres = useSelector((state) => state.matieres.matieres);
    const notes = useSelector((state) => state.notes.notes);
    const students = useSelector((state) => state.eleves.eleves);

    useEffect(() => {
        dispatch(loadClasses())
        if (selectedClassId && year) {
            dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
        }
    }, [selectedClassId, year, dispatch]);

    useEffect(() => {
        if (selectedMatiereId && selectedClassId && year) {
            dispatch(loadNotesByMatiereAndClasse({ idMatiere: selectedMatiereId, idClasseEtude: selectedClassId, annee: year.year() }));
        }else if (matieres.length === 0) {
            // Vider les notes si aucune matière n'est sélectionnée
            dispatch(loadNotesByMatiereAndClasse({ idMatiere: null, idClasseEtude: selectedClassId, annee: year.year() })); // ou une action pour réinitialiser les notes
        }
    }, [selectedMatiereId, selectedClassId, year, dispatch,matieres.length]);

    const refresh = async () => {
                    setIsRefreshing(true); // Commencer le rafraîchissement
                    dispatch(loadClasses())
                    try {
                        if (selectedClassId && year) {
                            dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
                            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
                        }
                        if (selectedMatiereId && selectedClassId && year) {
                            dispatch(loadNotesByMatiereAndClasse({ idMatiere: selectedMatiereId, idClasseEtude: selectedClassId, annee: year.year() }));
                        } else if (matieres.length === 0) {
                            // Vider les notes si aucune matière n'est sélectionnée
                            dispatch(loadNotesByMatiereAndClasse({ idMatiere: null, idClasseEtude: selectedClassId, annee: year.year() }));
                        }
                    } catch (error) {
                        console.error("Erreur lors du rafraîchissement :", error);
                    } finally {
                        setIsRefreshing(false); // Arrêter le rafraîchissement
                    }
                };
    const handleClassChange = (event, newValue) => {
        setSelectedClassId(newValue);
        console.log(selectedClassId);
        localStorage.setItem('class', newValue);
    };

    const handleMatiereChange = (event, newValue) => {
        setSelectedMatiereId( newValue);
        if (!newValue) {
            // Si aucune matière n'est sélectionnée, vider les notes
            dispatch(loadNotesByMatiereAndClasse({ idMatiere: null, idClasseEtude: selectedClassId, annee: year.year() }));
        }
    };


    // const navigate = useNavigate()

    const alert = useAlert()

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        setIsLogingOut(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/');
        }, 1000);
    };
 const handleDelete = async (id) => {
        setIsRefreshing(true);
        try {
            await dispatch(deleteNote(id));
            setAlertMessage("note supprimée avec succès !");
            setAlertType('success');
        } catch (error) {
            setAlertMessage("Erreur lors de la suppression de la note.");
            setAlertType('error');
        } finally {
            setIsRefreshing(false);
            setIsModalOpen(true);
        }
    };
    function TeacherRow({ id, matricule, firstName, lastName, seq1, seq2, seq3, seq4, seq5, seq6 }) {
        const [isEditing, setIsEditing] = useState(false);
        const [editedNotes, setEditedNotes] = useState({ seq1, seq2, seq3, seq4, seq5, seq6 });
    
        const handleEdit = () => {
            setIsEditing(true);
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setEditedNotes({
                ...editedNotes,
                [name]: value
            });
        };
    
        const handleSave = async () => {
            try {
                await dispatch(updateNote({ id, noteData: editedNotes })); // Utilisez votre thunk pour mettre à jour la note
                setIsEditing(false);
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la note:", error);
            }
        };
    
        return (
            <tr>
                <td>{id}</td>
                <td>{matricule}</td>
                <td>{firstName} {lastName}</td>
                {isEditing ? (
                    <>
                        <td><input type="number" name="seq1" value={editedNotes.seq1} onChange={handleChange} /></td>
                        <td><input type="number" name="seq2" value={editedNotes.seq2} onChange={handleChange} /></td>
                        <td><input type="number" name="seq3" value={editedNotes.seq3} onChange={handleChange} /></td>
                        <td><input type="number" name="seq4" value={editedNotes.seq4} onChange={handleChange} /></td>
                        <td><input type="number" name="seq5" value={editedNotes.seq5} onChange={handleChange} /></td>
                        <td><input type="number" name="seq6" value={editedNotes.seq6} onChange={handleChange} /></td>
                    </>
                ) : (
                    <>
                        <td>{seq1}</td>
                        <td>{seq2}</td>
                        <td>{seq3}</td>
                        <td>{seq4}</td>
                        <td>{seq5}</td>
                        <td>{seq6}</td>
                    </>
                )}
                <td className="option-buttons flex items-center justify-center py-2 gap-2">
                    {isEditing ? (
                        <>
                            <Button text="Sauvegarder" handler={handleSave} />
                            <Button text="Annuler" handler={() => setIsEditing(false)} />
                        </>
                    ) : (
                        <>
                            <EditOutlined onClick={handleEdit} className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px]" />
                            <DeleteOutline onClick={() => handleDelete(id)} className="bg-red-300 text-red-800 rounded-full p-2 hover:bg-red-400 hover:text-white !w-[35px] !h-[35px]" />
                        </>
                    )}
                </td>
            </tr>
        );
    }
    
    const handleChange = (
        event,
        newValue,
    ) => {
        console.log(newValue);
        setClasse(newValue);

    };
    // useEffect(() => {
    //   if (admin === null || admin.role !== 'ADMIN')
    //     navigate('/signin')
    //   else {
    //     refresh(dispatch)
    //   }
    // }, [admin])

    return (
        <div className="students" >
             {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white rounded-lg p-6 z-10">
                        <h2 className={`text-lg font-bold ${alertType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {alertType === 'success' ? 'Succès' : 'Erreur'}
                        </h2>
                        <p className="mt-2">{alertMessage}</p>
                        <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Fermer
                        </button>
                    </div>
                </div>
            )}
            <div className="container">
                <DashboardHeader admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Notes'} count={notes.length} />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions h-full">
                    <ModalContainer triggerText={'Nouvelle note'} formToDisplay={<NoteForm onClose={()=> setIsModalOpen(false)} selectedClassId={selectedClassId} year={year} />} />

                    <Button text={"Rafraîchir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} size={'25px'} />
                    </div>
                    
                </div>
                <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%]">
                <div className="ml-auto w-[30%]">
                        <p className="text-secondary font-bold">Classe</p>
                        <Select
                            placeholder={'Choisir la classe'}
                            indicator={<KeyboardArrowDown />}
                            sx={{
                                [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                },
                                height: '100%',
                                width: 'auto',
                                padding: '10px 20px',
                                border: '2px solid var(--secondary)',
                                color: 'var(--secondary)',
                                fontWeight: 700
                            }}
                            onChange={handleClassChange}
                        >
                            {classes.map((elt) => (
                                <Option value={elt.id} key={elt.id}>{elt.nom}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="ml-auto w-[30%]">
                        <p className="text-secondary font-bold">Matière</p>
                        <Select
                            placeholder={'Choisir la matière'}
                            indicator={<KeyboardArrowDown />}
                            sx={{
                                [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                },
                                height: '100%',
                                width: 'auto',
                                padding: '10px 20px',
                                border: '2px solid var(--secondary)',
                                color: 'var(--secondary)',
                                fontWeight: 700
                            }}
                            onChange={handleMatiereChange}
                        >
                            {matieres.map((matiere) => (
                                <Option value={matiere.id} key={matiere.id}>{matiere.designation}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="ml-auto w-[15%]">
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
                            </div> :(
                            <div className="overflow-x-auto">
                                <table className="">

                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>ID</th>
                                            <th rowSpan={2}>Matricule</th>
                                            <th rowSpan={2}>Nom(s) et Prénom(s)</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 1</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 2</th>
                                            <th colSpan={2} className="border-b border-secondary">Trimestre 3</th>
                                            <th rowSpan={2}>Option</th>
                                        </tr>
                                        <tr>
                                            <th>Séquence 1</th>
                                            <th>Séquence 2</th>
                                            <th>Séquence 3</th>
                                            <th>Séquence 4</th>
                                            <th>Séquence 5</th>
                                            <th>Séquence 6</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    <Pagination
                                        data={notes} // Remplacez ceci par vos données filtrées si nécessaire
                                        RenderComponent={({ id, Eleve, seq1, seq2, seq3, seq4, seq5, seq6 }) => (
                                            <TeacherRow
                                                id={id}
                                                matricule={Eleve.matricule}
                                                firstName={Eleve.prenom}
                                                lastName={Eleve.nom}
                                                seq1={seq1}
                                                seq2={seq2}
                                                seq3={seq3}
                                                seq4={seq4}
                                                seq5={seq5}
                                                seq6={seq6}
                                            />
                                        )}
                                        pageLimit={1}
                                        dataLimit={5}
                                        tablePagination={true}
                                    />
                                </table>

                            </div>
                            
                        )}
                    
                </div>

            </div>
        </div>
    );
};

export default Notes;
