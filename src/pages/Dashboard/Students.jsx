import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert-with-buttons';
import { DeleteOutline, EditOutlined, KeyboardArrowDown, RefreshOutlined } from "@mui/icons-material";
import { Skeleton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { reportCard } from "../../assets/lordicons/index.js";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import { Option, Select, selectClasses } from '@mui/joy';
import ModalContainer from "../../components/ModalContainer.jsx";
import StudentForm from "../../components/Forms/StudentForm.jsx";
import { fetchElevesParClasse } from "../../slices/eleveSlice"; 
import { loadClasses } from '../../slices/classSlice';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { updateEleve, deleteEleve,removeEleveFromClass } from '../../slices/eleveSlice'; // Ajouter cette ligne

const Students = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [classeId, setClasseId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY')); // Utiliser dayjs ici
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const classes = useSelector((state) => state.classes.classes);
    const students = useSelector((state) => state.eleves.eleves);

    // Charger les classes lors du montage du composant
    useEffect(() => {
        dispatch(loadClasses());
    }, [dispatch]);

    useEffect(() => {
        if (classeId && year) {
            dispatch(fetchElevesParClasse({ idClasseEtude: classeId, annee: year.year() })); // Utiliser year.year() pour obtenir l'année
        }
    }, [classeId, year, dispatch]);
    const refresh = async () => {
        setIsRefreshing(true); // Commencer le rafraîchissement
        try {
            await dispatch(loadClasses()); // Charger les classes
            if (classeId && year) {
                await dispatch(fetchElevesParClasse({ idClasseEtude: classeId, annee: year.year() })); // Charger les élèves
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement :", error);
        } finally {
            setIsRefreshing(false); // Arrêter le rafraîchissement
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
        setClasseId(newValue);
    };

    // Récupérer le nom de la classe seulement si les données sont disponibles
    const currentClass = classes.find(classe => classe.id === classeId);
    const className = currentClass ? currentClass.nom : null; // Utiliser null si la classe n'est pas trouvée


    function TeacherRow({ id, numeroDordre, matricule, nom, prenom, nomPere, telPere, nomMere, telMere, dateNaissance, sexe }) {
        const [isEditing, setIsEditing] = useState(false);
        const [editedStudent, setEditedStudent] = useState({ id, matricule, nom, prenom, telPere, telMere, dateNaissance, sexe });
        const [isNewInscription, setIsNewInscription] = useState(false);
        const [selectedClassId, setSelectedClassId] = useState(null);
        const [selectedYear, setSelectedYear] = useState(dayjs(new Date().getFullYear())); // Par défaut, l'année actuelle
        const [selectedFile, setSelectedFile] = useState(null); // État pour le fichier sélectionné
    
        const formatDate = (date) => {
            return dayjs(date).format('DD/MM/YYYY');
        };
    
        const handleEdit = () => {
            setIsEditing(true);
        };
    
        const handleSave = async () => {
            const eleveData = { ...editedStudent };
    
            // Si une nouvelle inscription est nécessaire, ajoutez les détails
            if (isNewInscription && selectedClassId) {
                eleveData.idClasseEtude = selectedClassId; // Ajout de l'id de la classe si c'est une nouvelle inscription
                eleveData.annee = selectedYear.year(); // Ajout de l'année d'inscription
            }
    
            console.log(eleveData)
            // Créer un FormData pour inclure le fichier image
            const formData = new FormData();
            if (selectedFile) {
                formData.append('images', selectedFile); // Ajouter l'image si elle est fournie
            }
            Object.keys(eleveData).forEach(key => {
                formData.append(key, eleveData[key]);
            });
    
            await dispatch(updateEleve({ id, formData })); // Passer formData à la fonction de mise à jour
            setIsEditing(false);
        };
    
        const handleDelete = () => {
            alert.open({
                message: `Voulez-vous vraiment supprimer ${nom} ${prenom} ?`,
                buttons: [
                    {
                        label: "Oui",
                        onClick: async () => {
                            await dispatch(deleteEleve(id));
                            alert.close();
                        },
                        style: { backgroundColor: "#990000", marginRight: "1rem", color: "white" },
                    },
                    {
                        label: "Non",
                        onClick: () => alert.close(),
                    },
                ],
            });
        };
    
        const handleRemoveFromClass = () => {
            alert.open({
                message: `Voulez-vous vraiment retirer ${nom} ${prenom} de cette classe ?`,
                buttons: [
                    {
                        label: "Oui",
                        onClick: async () => {
                            await dispatch(removeEleveFromClass({ idEleve: id, idClasse: classeId }));
                            alert.close();
                        },
                        style: { backgroundColor: "#990000", marginRight: "1rem", color: "white" },
                    },
                    {
                        label: "Non",
                        onClick: () => alert.close(),
                    },
                ],
            });
        };
    
        const handleFileChange = (e) => {
            setSelectedFile(e.target.files[0]); // Stocker le fichier sélectionné
        };
    
        const removeSelectedFile = () => {
            setSelectedFile(null); // Réinitialiser le fichier sélectionné
        };
    
        return (
            <tr>
                <td>{numeroDordre}</td>
                <td>{isEditing ? <input value={editedStudent.matricule} onChange={(e) => setEditedStudent({ ...editedStudent, matricule: e.target.value })} /> : matricule}</td>
                <td>{isEditing ? <input value={editedStudent.nom} onChange={(e) => setEditedStudent({ ...editedStudent, nom: e.target.value })} /> : nom}</td>
                <td>
                    {isEditing ? (
                        <div>
                            <input
                                value={editedStudent.prenom}
                                onChange={(e) => setEditedStudent({ ...editedStudent, prenom: e.target.value })}
                            />
                             <input
                type="file"
                id="file-upload" // Ajoutez un id à l'input
                accept="image/*"
                onChange={handleFileChange}
                
            />
           
                            {selectedFile && (
                                <div className="image-preview">
                                    <img src={URL.createObjectURL(selectedFile)} alt="Aperçu" style={{ width: '100px', height: '100px' }} />
                                    <Button  text={"Annuler l'image "} handler={removeSelectedFile}/>
                                </div>
                            )}
                        </div>
                    ) : (
                        prenom
                    )}
                </td>
                <td>{formatDate(dateNaissance)}</td>
                <td>{sexe}</td>
                <td>
                    <span className="font-size-2px font-semibold">{nomPere || 'inconnue'}/</span>
                    <span className="font-size-2px">{isEditing ? <input value={editedStudent.telPere} onChange={(e) => setEditedStudent({ ...editedStudent, telPere: e.target.value })} /> : telPere}</span>
                </td>
                <td>
                    <span className="font-size-2px font-semibold">{nomMere || 'inconnue'}/</span>
                    <span className="font-size-2px">{isEditing ? <input value={editedStudent.telMere} onChange={(e) => setEditedStudent({ ...editedStudent, telMere: e.target.value })} /> : telMere}</span>
                </td>
                <td className="option-buttons option flex items-center justify-center py-2 gap-2">
                    {isEditing ? (
                        <>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isNewInscription}
                                    onChange={(e) => setIsNewInscription(e.target.checked)}
                                />
                                Nouvelle Inscription
                            </label>
                            {isNewInscription && (
                                <>
                                    <Select
                                        placeholder={'Choisir la classe'}
                                        indicator={<KeyboardArrowDown />}
                                        onChange={(event, newValue) => setSelectedClassId(newValue)}
                                    >
                                        {classes.map((elt) => (
                                            <Option value={elt.id} key={elt.id}>{elt.nom}</Option>
                                        ))}
                                    </Select>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Sélectionnez une année"
                                            views={['year']}
                                            value={selectedYear}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setSelectedYear(newValue);
                                                }
                                            }}
                                            renderInput={(params) => <input {...params} className="year-selector" />}
                                        />
                                    </LocalizationProvider>
                                </>
                            )}
                            <Button text="Sauvegarder" handler={handleSave} />
                            <Button text="Annuler" handler={() => setIsEditing(false)} />
                            <Button text="Retirer de la classe" handler={handleRemoveFromClass} />
                        </>
                    ) : (
                        <>
                            <EditOutlined onClick={handleEdit} className="bg-emerald-300 cursor-pointer" />
                            <DeleteOutline onClick={handleDelete} className="bg-red-300 cursor-pointer" />
                        </>
                    )}
                </td>
            </tr>
        );
    }
    
        
         
        
    return (
        <div className="students">
            <div className="container">
                <DashboardHeader 
                    admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} 
                    handleLogout={handleLogout} 
                    isLogingOut={isLogingOut} 
                    isRefreshing={isRefreshing} 
                    icon={reportCard} 
                    title={'Elèves'} 
                    count={students.length} 
                    classe={className || 'Chargement...'}  // Afficher "Chargement..." si la classe n'est pas encore disponible
                />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions h-full">
                        <ModalContainer triggerText={'Nouveau'} formToDisplay={<StudentForm onClose={() =>  setIsModalOpen(false)} />} />
                        <Button text={"Rafraichir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} size={'25px'} />
                    </div>
                   
                    
                </div>
                <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%]">
                <div  className="ml-auto w-[30%]" >
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
                            onChange={handleChange}
                        >
                            {classes.map((elt, i) => (
                                <Option value={elt.id} key={i}>{elt.nom}</Option>
                            ))}
                        </Select>
                    </div>
                    <div  className="ml-auto [15%]">
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
                    {isRefreshing ? (
                        <Skeleton variant="rectangular" width='100%' height={55} />
                    ) : (
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Matricule</th>
                                        <th>Nom(s)</th>
                                        <th>Prenom(s)</th>
                                        <th>Date de Naissance</th>
                                        <th>Sexe</th>
                                        <th>pere/tel</th>
                                        <th>Mere/tel</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
    {students && students.length > 0 ? (
        <Pagination data={students.map(student => ({
            ...student,
            numeroDordre: student.Inscriptions && student.Inscriptions[0] ? student.Inscriptions[0].numeroDordre : null
        }))} RenderComponent={TeacherRow} pageLimit={1} dataLimit={5} tablePagination={true}/>
    ) : (
        <tr>
            <td colSpan="7">Aucun élève trouvé.</td>
        </tr>
    )}
</tbody>

                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Students;