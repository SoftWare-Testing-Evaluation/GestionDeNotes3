// src/components/Forms/NoteForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Button from '../Button/Button.jsx';
import './forms.css';
import { loadMatieresByClasse } from '../../slices/matiereSlice.js'; // Assurez-vous d'importer la bonne action
import { addNote } from '../../slices/noteSlice.js'; // Assurez-vous d'importer la bonne action
import { fetchElevesParClasse } from "../../slices/eleveSlice.js";

const NoteForm = ({ onClose, selectedClassId, year }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        idEleve: '',
        idMatiere: '',
        seq1: '',
        seq2: '',
        seq3: '',
        seq4: '',
        seq5: '',
        seq6: '',
    });
    const [annee, setAnnee] = useState(year || dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear()));
    const [errorMessage, setErrorMessage] = useState('');

    const students = useSelector(state => state.eleves.eleves);
    const matieres = useSelector(state => state.matieres.matieres);

    useEffect(() => {
        if (selectedClassId && annee) {
            dispatch(loadMatieresByClasse({ idClasseEtude: selectedClassId, annee: annee.year() }));
            dispatch(fetchElevesParClasse({ idClasseEtude: selectedClassId, annee: year.year() })); // Utiliser year.year() pour obtenir l'année
        }
    }, [selectedClassId, annee, dispatch]);

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
        [fieldName]: fieldName.startsWith('seq') ? Number(value) : value // Convertir seq en nombre
        });
    };

    const handleYearChange = (newValue) => {
        if (newValue && newValue.isValid()) {
            setAnnee(newValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addNote(formData));
           onClose(); // Fermer le modal après l'ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout de la note:", error);
            setErrorMessage("Erreur lors de l'ajout de la note. Veuillez réessayer.");
        }
    };

    return (
        <div className='form'>
            <h2 className="form-title">Ajouter une Note</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="annee" className="text-secondary font-bold">Année</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            views={['year']}
                            value={annee}
                            onChange={handleYearChange}
                            renderInput={(params) => <input {...params} className="year-selector" />}
                        />
                    </LocalizationProvider>
                </div>
                <div className='gap-1' />

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="idEleve" className="text-secondary font-bold">Élève</label>
                    <select
                        name="idEleve"
                        onChange={(e) => handleChange(e, 'idEleve')}
                        style={{ width: '100%', borderRadius: '10px' }}
                    >
                        <option value="">Sélectionner un élève</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>{`${student.prenom} ${student.nom}`}</option>
                        ))}
                    </select>
                </div>
                <div className='gap-1' />

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="idMatiere" className="text-secondary font-bold">Matière</label>
                    <select
                        name="idMatiere"
                        onChange={(e) => handleChange(e, 'idMatiere')}
                        style={{ width: '100%', borderRadius: '10px' }}
                    >
                        <option value="">Sélectionner une matière</option>
                        {matieres.map((matiere) => (
                            <option key={matiere.id} value={matiere.id}>{matiere.designation}</option>
                        ))}
                    </select>
                </div>
                <div className='gap-1' />

                {/* Champs pour les séquences */}
                {['seq1', 'seq2', 'seq3', 'seq4', 'seq5', 'seq6'].map((seq, index) => (
                    <div key={index} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor={seq} className="text-secondary font-bold">Séquence {index + 1}</label>
                        <input
                            type="number"
                            name={seq}
                            value={formData[seq]}
                            onChange={(e) => handleChange(e, seq)}
                            placeholder={`Entrez la note de la séquence ${index + 1}`}
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </div>
                ))}

                <Button text={'Ajouter'} width="100%" handler={handleSubmit} fontWeight="bold" />
            </form>
        </div>
    );
};

export default NoteForm;
