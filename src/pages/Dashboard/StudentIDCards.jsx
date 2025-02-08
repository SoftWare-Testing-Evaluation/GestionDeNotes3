import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { loadClasses } from '../../slices/classSlice';
import { fetchElevesParClasse } from '../../slices/eleveSlice';
import SNMSelect from '../../components/SNMSelect/SNMSelect.jsx';
import Button from '../../components/Button/Button.jsx';
import DashboardHeader from '../../containers/DashboardHeader/DashboardHeader.jsx';
import Typography from '../../components/Typography/Typography.jsx';
import dayjs from 'dayjs';

const StudentIDCards = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes.classes);
    const studentsData = useSelector((state) => state.eleves.eleves);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [year, setYear] = useState(dayjs(new Date().getFullYear()));
    const [filteredStudents, setFilteredStudents] = useState([]);
    const contentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        onAfterPrint: () => console.log("Impression terminée"),
    });

    useEffect(() => {
        dispatch(loadClasses());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClassId) {
            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() }));
        }
    }, [selectedClassId, year, dispatch]);

    useEffect(() => {
        // Filtrer les élèves en fonction de la classe sélectionnée
        const filtered = studentsData.filter(student => student.idClasseEtude === selectedClassId);
        setFilteredStudents(filtered);
    }, [studentsData, selectedClassId]);

    return (
        <div className="student-id-cards">
            <DashboardHeader title="Impression des cartes d'identité" />
            <div className="controls">
                <SNMSelect label="Classe" options={classes} handleChange={setSelectedClassId} />
                <input 
                    type="number" 
                    value={year.year()} 
                    onChange={(e) => setYear(dayjs(e.target.value))} 
                    placeholder="Année" 
                />
                <Button text="Imprimer" handler={handlePrint} />
            </div>
            <div ref={contentRef} className="print-content">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                        <div key={student.id} className="student-card">
                            <img src={student.photoUrl} alt={`${student.nom} ${student.prenom}`} className="student-photo" />
                            <h2>{student.nom} {student.prenom}</h2>
                            <p>Téléphone: {student.telPere}</p>
                            <p>Date de naissance: {dayjs(student.dateNaissance).format('DD/MM/YYYY')}</p>
                            <p>Classe: {student.idClasseEtude}</p>
                        </div>
                    ))
                ) : (
                    <Typography text="Aucun élève trouvé pour cette classe." />
                )}
            </div>
        </div>
    );
};

export default StudentIDCards;
