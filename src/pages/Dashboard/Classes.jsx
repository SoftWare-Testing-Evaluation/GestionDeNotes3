import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard/classes.css";

import { useAlert } from 'react-alert-with-buttons'
import { ArrowRightAlt, DeleteOutline, EditOutlined, Logout, Person2Outlined, RefreshOutlined } from "@mui/icons-material";

import { Skeleton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Button from "../../components/Button/Button.jsx";
// import { TeacherRow } from "../../components/Utils/TableRows/TableRows";
import Loader from "../../components/Loader/Loader.jsx";
import { Player } from "@lordicon/react";
import { folderOrange, teacher } from "../../assets/lordicons/index.js";
import { classes, onPlayPress } from "../../utils/utilities.jsx";
import DashboardHeader from "../../containers/DashboardHeader/DashboardHeader.jsx";
import ClassForm from '../../components/Forms/ClassForm.jsx'
import ModalContainer from "../../components/ModalContainer.jsx";
import { loadClasses, updateClasse,deleteClasse } from '../../slices/classSlice';
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchElevesParClasse } from "../../slices/eleveSlice"; // Importez cette action

const Classes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear()));
    const [classeId, setClasseId] = useState(null); // État pour l'ID de la classe
    const [effectifs, setEffectifs] = useState({}); // État pour stocker les effectifs par classe

    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const students = useSelector((state) => state.eleves.eleves);

    // Charger les classes lors du montage du composant
    useEffect(() => {
        dispatch(loadClasses());
    }, [dispatch]);

    useEffect(() => {
        if (year) {
            classes.forEach(classe => {
                dispatch(fetchElevesParClasse({ idClasseEtude: classe.id, annee: year.year() }))
                    .then((result) => {
                        // Vérifiez si result.payload est un tableau
                        if (Array.isArray(result.payload)) {
                            const effectif = result.payload.filter(student => student.Inscriptions.some(inscription => inscription.idClasseEtude === classe.id)).length;
                            setEffectifs(prev => ({ ...prev, [classe.id]: effectif }));
                        } else {
                            // Si ce n'est pas un tableau, définissez l'effectif à zéro
                            setEffectifs(prev => ({ ...prev, [classe.id]: 0 }));
                        }
                    });
            });
        }
    }, [year, dispatch, classes]);

    const handleDelete = async (id) => {
        setIsRefreshing(true);
        try {
            await dispatch(deleteClasse(id));
            alert.success("Classe supprimée avec succès !");
        } catch (error) {
            alert.error("Erreur lors de la suppression de la classe.");
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

    function TeacherRow({ id, nom, scolarite }) {
        const effectif = effectifs[id] || 0; // Utiliser l'effectif stocké ou 0 si non défini
        return (
            <tr>
                <td>
                    <Link to={'/students'} className="flex items-center justify-center bg-emerald-300 hover:bg-emerald-400"   onClick={() => {
                                        setClasseId(id);
                                        localStorage.setItem('class', id);
                                        localStorage.setItem('year',year);
                                    }} >
                        <ArrowRightAlt className="text-emerald-800 !w-[35px] !h-[35px]" />
                        <span className="text-2xl">Accéder</span>
                    </Link>
                </td>
                <td>{id}</td>
                <td className="text-xl">{nom}</td>
                <td>{effectif}</td>
                <td>{scolarite} XAF</td>
                <td className="option-buttons flex items-center justify-center py-2 gap-2">
                    <EditOutlined className="bg-emerald-300 text-emerald-800 rounded-full p-2 hover:bg-emerald-400 hover:text-white !w-[35px] !h-[35px]" />
                    <DeleteOutline className="bg-red-300 text-red-800 rounded-full p-2 hover:bg-red-400 hover:text-white !w-[35px] !h-[35px]" onClick={() => alert.open({
                        message: `Voulez-vous vraiment supprimer ${nom} ?`,
                        buttons: [
                            {
                                label: "Oui",
                                onClick: () => {
                                    handleDelete(id);
                                    alert.close();
                                },
                                style: { backgroundColor: "#990000", color: "white" },
                            },
                            {
                                label: "Non",
                                onClick: () => alert.close(),
                            },
                        ],
                    })} />
                </td>
            </tr>
        );
    }

    return (
        <div className="classes">
            <div className="container">
                <DashboardHeader admin={user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu'} handleLogout={handleLogout} isLogingOut={isLogingOut} isRefreshing={isRefreshing} title={'Classes'} count={classes.length} />

                <div className="actions">
                    <ModalContainer triggerText={'Nouveau'} formToDisplay={<ClassForm />} />
                    <Button text={"Rafraîchir"} margin='0 1rem' bg='black' icon={<RefreshOutlined />} height='2.5rem' isLoading={isRefreshing} />
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

                <div className="data">
                    {isRefreshing ? (
                        <Skeleton variant="rectangular" width='100%' height={55} />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Effectif</th>
                                    <th>Scolarité</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Pagination data={classes} RenderComponent={TeacherRow} pageLimit={1} dataLimit={10} tablePagination={true} />
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Classes;


