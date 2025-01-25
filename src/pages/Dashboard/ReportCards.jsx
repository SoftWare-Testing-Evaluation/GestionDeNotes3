import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert-with-buttons';
import "../../styles/Dashboard/students.css";
import { students } from "../../assets/lordicons/index.js";
import { Skeleton } from "@mui/material";
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
import ReportHeader from "../../components/ReportHeader/ReportHeader.jsx";
import logo from '../../assets/logo.svg'

const ReportCards = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const contentRef = useRef();
    const handlePrint = useReactToPrint({contentRef})
    
    
   /*   const handlePrint = useReactToPrint({
        content: () => contentRef,
        onError: (error) => {
            console.error("Erreur lors de l'impression :", error);
        },
        onAfterPrint: () => {
            console.log("Impression terminée");
        }
    });  */
    
    
    const [selectedClassId, setSelectedClassId] = useState(localStorage.getItem('class'));
    const [year, setYear] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear(), 'YYYY'));
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSequence, setSelectedSequence] = useState('seq1'); // Valeur par défaut
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLogingOut, setIsLogingOut] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const classes = useSelector((state) => state.classes.classes);
    const studentsData = useSelector((state) => state.eleves.eleves);
    const matieres = useSelector((state) => state.matieres.matieres);
    const [allNotes, setAllNotes] = useState([]); // État pour stocker toutes les notes
    const dispensations = useSelector((state) => state.dispensations.dispensations);
    const enseignants = useSelector((state) => state.enseignants.enseignants);
    const selectedClass = classes.find(classe => classe.id === selectedClassId);
    
    
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
            const notesPromises = matieres.map(matiere => 
                dispatch(loadNotesByMatiereAndClasse({ idMatiere: matiere.id, idClasseEtude: selectedClassId, annee: year.year() }))
            );
    
            Promise.all(notesPromises).then((results) => {
                const newNotes = results.flatMap(result => result.payload); // Extraire le payload
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
        if (note < 10 || note === undefined || note === null || note === '') {
            return 'NA';
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

    const renderNotesWithPrevious = (groupe) => {
        return matieres.filter(m => m.groupe === groupe).map((matiere, index) => {
            const dispenser = matiere?.Dispensers && matiere.Dispensers.length > 0 ? matiere.Dispensers[0] : null;
            const enseignant = enseignants ? enseignants.find(e => e.id === dispenser?.idEnseignant) : null;
               // Déterminer le titre de l'enseignant
            const enseignantTitre = enseignant ? (enseignant.sexe === 'M' ? 'M.' : 'Mme') : 'Enseignant inconnu';
            // Trouver la note correspondante
            const note = filteredNotes.find(note => note.idMatiere === matiere.id);
            const noteValue = note ? note[selectedSequence] : null;
            const coefficient = getCoefficient(matiere.id);
    
            // Récupérer les notes nécessaires
            let previousNoteValue = null;
            let trimNoteValue = null;
    
            if (selectedSequence === 'seq2') {
                previousNoteValue = note ? note.seq1 : null;
                trimNoteValue = note ? (note.seq1 + note.seq2) / 2 : null;
            } else if (selectedSequence === 'seq4') {
                previousNoteValue = note ? note.seq3 : null;
                trimNoteValue = note ? (note.seq3 + note.seq4) / 2 : null;
            } else if (selectedSequence === 'seq6') {
                previousNoteValue = note ? note.seq5 : null;
                trimNoteValue = note ? (note.seq5 + note.seq6) / 2 : null;
            }
    
            // Calculer le total
            const total1 = (noteValue !== undefined && noteValue !== null && noteValue !== '') 
                ? noteValue * coefficient 
                : '-';
    
            const total = (trimNoteValue !== undefined && trimNoteValue !== null && trimNoteValue !== '') 
                ? (isNaN(trimNoteValue) ? '-' : trimNoteValue * coefficient) 
                : total1;
    
            return (
                <tr key={index}>
                    <td className="flex flex-col items-center">
                        <span className="text-2xl font-semibold">{matiere?.designation || 'Matière inconnue'}</span>
                        <span>{enseignant ? `${enseignantTitre} ${enseignant.nom} ${enseignant.prenom}` : 'Enseignant inconnu'}</span>

                    </td>
                    {selectedSequence === 'seq2' && <td>{previousNoteValue !== undefined && previousNoteValue !== null ? previousNoteValue : '-'}</td>}
                    {selectedSequence === 'seq4' && <td>{previousNoteValue !== undefined && previousNoteValue !== null ? previousNoteValue : '-'}</td>}
                    {selectedSequence === 'seq6' && <td>{previousNoteValue !== undefined && previousNoteValue !== null ? previousNoteValue : '-'}</td>}
                    <td>{noteValue !== undefined && noteValue !== null ? noteValue : '-'}</td>
                    {selectedSequence !== 'seq1' && selectedSequence !== 'seq3' && selectedSequence !== 'seq5' && (
                        <td>{trimNoteValue !== null ? (isNaN(trimNoteValue) ? '-' : trimNoteValue) : '-'}</td>
                    )}
                    <td>{coefficient}</td>
                    <td>{total}</td>
                    <td>{note ? note.competence : '                       '}</td>
                    <td>{getCompetence(trimNoteValue !== null && !isNaN(trimNoteValue) ? trimNoteValue : noteValue)}</td>
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
                    icon={students} 
                    title={`Bulletin de l'élève ${selectedStudent ? selectedStudent.nom : ''}`} 
                    count={matieres.length}
                />

                <div className="flex !justify-between items-center w-[95%]">
                    <div className="actions !w-auto">
                        <Button text={"Rafraîchir"} bg='black' icon={<RefreshOutlined />} height='2.5rem' handler={refresh} isLoading={isRefreshing} />
                    </div>
                    <div className="flex items-center justify-center bg-emerald-300 hover:bg-emerald-400 [&>*]:hover:text-white ease-in-out duration-300 hover:scale-110 cursor-pointer py-5 px-10 ml-auto w-[30%]" onClick={handlePrint}>
                        <Download className="text-emerald-800  !w-[35px] !h-[35px] " />
                        <span className="text-3xl font-bold">Imprimer</span>
                    </div>
                </div>
               

                <div className="flex my-5 p-3 !justify-between bg-orange-100 w-[95%]">
                
                <div className="ml-auto w-[30%]">
                    <SNMSelect label={'Classe'} placeholder={'Choisir la classe'} options={classes} handleChange={setSelectedClassId} />
                   </div>
                   <div className="ml-auto w-[30%]">
                    <SNMSelect label={'Élève'} placeholder={'Choisir l\'élève'} options={studentsData} handleChange={setSelectedStudent} isStudentSelect={true} />
                    </div>
                    <div className="ml-auto w-[20%]">
                        <SNMSelect 
                            label={'Séquence'} 
                            placeholder={'Choisir la séquence'} 
                            options={sequenceOptions} 
                            handleChange={setSelectedSequence} 
                        />
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
                <div  ><ReportHeader 
                                    telephone={user ? user.telephone : ''} 
                                    anneeprecedent={year.year() - 1} 
                                    annee={year.year()} 
                                    logo={logo} // Remplacez par le chemin d'accès à votre logo
                                /></div>

                <div className="data" >
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
                            <table className="">
                                <thead>
                                    <tr className="[&>*]:uppercase">
                                        <th>Matière/enseignant</th>
                                        {selectedSequence === 'seq2' && <th>ES1</th>}
                                        {selectedSequence === 'seq4' && <th>ES3</th>}
                                        {selectedSequence === 'seq6' && <th>ES5</th>}
                                        {selectedSequence === 'seq2' && <th>ES2</th>}
                                        {selectedSequence === 'seq4' && <th>ES4</th>}
                                        {selectedSequence === 'seq6' && <th>ES6</th>}
                                        {selectedSequence === 'seq1' && <th>ES1</th>}
                                        {selectedSequence === 'seq3' && <th>ES3</th>}
                                        {selectedSequence === 'seq5' && <th>ES5</th>}
                                        {(selectedSequence === 'seq2'||selectedSequence === 'seq4'||selectedSequence === 'seq6') && <th>TRIM</th>}
                                        <th>Cf</th>
                                        <th>Total</th>                                      
                                        <th>Compétence(s) Visée(s)</th>
                                        <th>App./Visa Prof</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Matières Littéraires */}
                                    <tr>
                                        <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Littéraires</td>
                                    </tr>
                                    {renderNotesWithPrevious(1)}

                                    {/* Matières Scientifiques */}
                                    <tr>
                                        <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Scientifiques</td>
                                    </tr>
                                    {renderNotesWithPrevious(2)}

                                    {/* Matières Complémentaires */}
                                    <tr>
                                        <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Complémentaires</td>
                                    </tr>
                                    {renderNotesWithPrevious(3)}
                                </tbody>
                            </table>
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
                                    <Skeleton variant="rectangular" width='100%' height={55} />
                                    <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                                        {
                                            Array.apply(null, { length: 25 }).map((value, index) =>
                                                <Skeleton key={index} variant="rounded" width={'98%'} height={40} style={{ margin: '0.125rem auto' }} />
                                            )
                                        }
                                    </div>
                                </div> :<div className="overflow-x-auto">
                                <ReportHeader 
                                    telephone={user ? user.telephone : ''} 
                                    anneeprecedent={year.year() - 1} 
                                    annee={year.year()} 
                                    logo={logo} // Remplacez par le chemin d'accès à votre logo
                                />
                                    
                                <div className="flex my-5 p-3 !justify-between bg-[#fdba74] w-[100%]">
                               
                                    <div style={{ display:'flex',flexDirection:'column' }} className="w-[40%] ">
                                        <p style={{fontWeight:'bold' ,fontSize:'15px', width:'100%', margin:'0'}}  >Année: {year.year()}</p>
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}>Nom et Prénom:  {selectedStudent ? selectedStudent.nom  : ''} {selectedStudent ? selectedStudent.prenom : ''}</p> 
                                           
                                        <div  style={{ display:'flex',flexDirection:'row'}}>
                                             <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}> Né(e) le: {selectedStudent?selectedStudent.dateNaissance :''} </p>
                                             <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}>à: {selectedStudent?selectedStudent.lieuNaissance :''} </p> 
                                        </div>
                                    
                                    </div>
                                    <div style={{ display:'flex',flexDirection:'column' }} className="w-[20%] ">
                                       <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}> Matricule: {selectedStudent ? selectedStudent.matricule :''}</p> 
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}>Genre:  {selectedStudent ? selectedStudent.sexe :''}</p> 
                                    </div>
                                    <div style={{ display:'flex',flexDirection:'column' }} className="w-[20%] ">
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}} > Classe:{ selectedClass ? selectedClass.nom : 'Classe inconnue'}</p>
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}> Statut:      {}</p>   
                                        
                                    </div>
                                    <div style={{ display:'flex',flexDirection:'column' }} className="w-[20%] ">
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}>Effectif:  {studentsData.length}</p>
                                        <p style={{fontWeight:'bold', fontSize:'15px',width:'100%', margin:'0'}}> Redt: {selectedStudent ? selectedStudent.Inscriptions[0]?.redoublant:''} </p> 
                                    </div>
                            
                                </div>
                                
                            
                                <br></br>
                    <table className="">
                        <thead>
                            <tr className="[&>*]:uppercase">
                                <th>Matière/enseignants</th>
                                        {selectedSequence === 'seq2' && <th>ES1</th>}
                                        {selectedSequence === 'seq4' && <th>ES3</th>}
                                        {selectedSequence === 'seq6' && <th>ES5</th>}
                                        {selectedSequence === 'seq2' && <th>ES2</th>}
                                        {selectedSequence === 'seq4' && <th>ES4</th>}
                                        {selectedSequence === 'seq6' && <th>ES6</th>}
                                        {selectedSequence === 'seq1' && <th>ES1</th>}
                                        {selectedSequence === 'seq3' && <th>ES3</th>}
                                        {selectedSequence === 'seq5' && <th>ES5</th>}
                                        {(selectedSequence === 'seq2'||selectedSequence === 'seq4'||selectedSequence === 'seq6') && <th>TRIM</th>}
                                <th>Cf</th>
                                <th>Total</th>
                                <th>Compétence(s) Visée(s)</th>
                                <th>App./Visa Prof</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Littéraires</td>
                            </tr>
                            {renderNotesWithPrevious(1)}

                            <tr>
                                <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Scientifiques</td>
                            </tr>
                            {renderNotesWithPrevious(2)}

                            <tr>
                                <td aria-colspan={'100%'} className="!bg-secondary text-white">Matières Complémentaires</td>
                            </tr>
                            {renderNotesWithPrevious(3)}
                        </tbody>
                    </table>
                    </div>
                    }
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ReportCards;