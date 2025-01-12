// src/pages/Dashboard/Dispensations.jsx
import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert-with-buttons';
import { DeleteOutline, EditOutlined, KeyboardArrowDown, RefreshOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { folderOrange, reportCard, teacher } from "../../assets/lordicons/index.js";
import "../../styles/Dashboard/dispensations.css";
import { useDispatch, useSelector } from "react-redux";
import { loadDispensations, deleteDispenser, updateDispenser } from '../../slices/dispenserSlice';
import { Option, Select } from '@mui/joy';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Button from "../../components/Button/Button.jsx";
import ModalContainer from "../../components/ModalContainer.jsx";
import DispenserForm from "../../components/Forms/DispenserForm.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx"; // Assurez-vous que ce composant existe
import { loadEnseignants } from '../../slices/enseignantSlice';
import { loadClasses } from '../../slices/classSlice';
import { loadMatieres } from '../../slices/matiereSlice.js';

const Dispensations = () => {
     const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [isLogingOut, setIsLogingOut] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // 'success' ou 'error'
    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY')); // Utiliser dayjs ici
    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const enseignants = useSelector((state) => state.enseignants.enseignants);
    const matieres = useSelector((state) => state.matieres.matieres);
    const dispensations = useSelector((state) => state.dispensations.dispensations);
    const totalDispensations = dispensations.length;

    // Charger les enseignants, les classes, les matières et les dispensations lors du montage du composant
    useEffect(() => {
        dispatch(loadEnseignants());
        dispatch(loadClasses());
        dispatch(loadMatieres());
        dispatch(loadDispensations());
    }, [dispatch]);
    

    const refresh = () => {
        setIsRefreshing(true);
        dispatch(loadDispensations()).finally(() => setIsRefreshing(false));
    };

    const handleDelete = async (id) => {
        setIsRefreshing(true);
        try {
            await dispatch(deleteDispenser(id));
            setAlertMessage("Dispensation supprimée avec succès !");
            setAlertType('success');
        } catch (error) {
            setAlertMessage("Erreur lors de la suppression de la dispensation.");
            setAlertType('error');
        } finally {
            setIsRefreshing(false);
            setIsModalOpen(true);
        }
    };

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
    useEffect(() => {
        dispatch(loadDispensations());
    }, [selectedClassId, dispatch]);

    const handleChange = (event, newValue) => {
        setSelectedClassId(newValue);
    };
    // Définition du composant TeacherRow

    function TeacherRow({ id, idMatiere, idClasseEtude, idEnseignant, annee, coefficient }) {
        const [isEditing, setIsEditing] = useState(false);
        const [editedIdMatiere, setEditedIdMatiere] = useState(idMatiere);
        const [editedIdClasseEtude, setEditedIdClasseEtude] = useState(idClasseEtude);
        const [editedIdEnseignant, setEditedIdEnseignant] = useState(idEnseignant);
       
        const [editedAnnee, setEditedAnnee] = useState(dayjs(annee).isValid() ? dayjs(annee) : dayjs());


        const [editedCoefficient, setEditedCoefficient] = useState(coefficient);
    
        const handleEdit = () => {
            setIsEditing(true);
        };
    
        const handleSave = async () => {
            const dispenserData = {};
            
            // Construire l'objet dispenserData en fonction des modifications
            if (editedIdMatiere !== idMatiere) dispenserData.idMatiere = editedIdMatiere;
            if (editedIdClasseEtude !== idClasseEtude) dispenserData.idClasseEtude = editedIdClasseEtude;
            if (editedIdEnseignant !== idEnseignant) dispenserData.idEnseignant = editedIdEnseignant;
            if (!editedAnnee.isSame(dayjs(annee))) dispenserData.annee = editedAnnee.year(); // Enregistrer l'année
            if (editedCoefficient !== coefficient) dispenserData.coefficient = editedCoefficient;
    
            console.log(dispenserData)
            // Ne pas envoyer un objet vide
            if (Object.keys(dispenserData).length === 0) {
                setIsEditing(false);
                return; // Aucune modification à enregistrer
            }
    
            try {
                await dispatch(updateDispenser({ id, dispenserData }));
                setAlertMessage("Dispensation mise à jour avec succès !");
                setAlertType('success');
            } catch (error) {
                setAlertMessage("Erreur lors de la mise à jour de la dispensation.");
                setAlertType('error');
            } finally {
                setIsEditing(false);
            }
        };
    
        // Récupérer les désignations
        const matiere = matieres.find(m => m.id === idMatiere);
        const classe = classes.find(c => c.id === idClasseEtude);
        const enseignant = enseignants.find(e => e.id === idEnseignant);
    
        return (
            <tr>
                <td>{id}</td>
                <td>
                    {isEditing ? (
                        <select value={editedIdMatiere} onChange={(e) => setEditedIdMatiere(e.target.value)}>
                            {matieres.map(m => (
                                <option key={m.id} value={m.id}>{m.designation}</option>
                            ))}
                        </select>
                    ) : (
                        (matiere ? matiere.designation : 'N/A')
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <select value={editedIdClasseEtude} onChange={(e) => setEditedIdClasseEtude(e.target.value)}>
                            {classes.map(c => (
                                <option key={c.id} value={c.id}>{c.nom}</option>
                            ))}
                        </select>
                    ) : (
                        (classe ? classe.nom : 'N/A')
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <select value={editedIdEnseignant} onChange={(e) => setEditedIdEnseignant(e.target.value)}>
                            {enseignants.map(e => (
                                <option key={e.id} value={e.id}>{`${e.prenom} ${e.nom}`}</option>
                            ))}
                        </select>
                    ) : (
                        (enseignant ? `${enseignant.prenom} ${enseignant.nom}` : 'N/A')
                    )}
                </td>
                <td>
                {isEditing ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Sélectionnez une année"
                            views={['year']}
                            value={editedAnnee}
                            onChange={(newValue) => {
                                if (newValue && newValue.isValid()) {
                                    setEditedAnnee(newValue);
                                }
                            }}
                            renderInput={(params) => <input {...params} className="year-selector" />}
                        />
                    </LocalizationProvider>
                ) : (
                    annee
                )}
            </td>
                <td>{isEditing ? <input value={editedCoefficient} onChange={(e) => setEditedCoefficient(e.target.value)} /> : coefficient}</td>
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
    


    // Filtrer les dispensations par classe et année
const filteredDispensations = dispensations.filter(dispensation => {
    const matchesClass = selectedClassId ? dispensation.idClasseEtude === Number(selectedClassId) : true;
    const matchesYear = year ? dispensation.annee === year.year() : true;
    return matchesClass && matchesYear;
});

// Debugging
console.log("Selected Class ID:", selectedClassId);
console.log("Filtered Dispensations:", filteredDispensations);


    return (
        <div className="dispensations">
            {/* Modal pour afficher les alertes */}
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
                <DashboardHeader admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} icon={reportCard} title={'Dispensations'} count={totalDispensations} />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions h-full">
                        <ModalContainer triggerText={'Nouvelle Dispensation'} formToDisplay={<DispenserForm onClose={handleCloseModal} />} />
                        <Button text={"Rafraîchir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} />
                    </div>
                    <div style={{ marginRight: '5px' }}>
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
                                value={year}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setYear(newValue);
                                        localStorage.setItem('year', newValue.year());
                                    }
                                }}
                                renderInput={(params) => <input {...params} className="year-selector" />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="data">
                    {isRefreshing ? (
                        <div>
                            <Skeleton variant="rectangular" width='100%' height={55} />
                            <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                {Array.apply(null, { length: 25 }).map((value, index) =>
                                    <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Matière</th>
                                        <th>Classe</th>
                                        <th>Enseignant</th>
                                        <th>Année</th>
                                        <th>Coefficient</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Pagination
                                        data={filteredDispensations} 
                                        RenderComponent={({ id, idMatiere, idClasseEtude, idEnseignant, annee, coefficient }) => (
                                            <TeacherRow
                                                id={id}
                                                idMatiere={idMatiere}
                                                idClasseEtude={idClasseEtude}
                                                idEnseignant={idEnseignant}
                                                annee={annee}
                                                coefficient={coefficient} // Ajout du coefficient
                                            />
                                        )}
                                        pageLimit={1}
                                        dataLimit={5}
                                        tablePagination={true}
                                    />
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dispensations;
