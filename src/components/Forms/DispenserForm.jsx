import React, { useState } from 'react';
import InputText from '../InputText/InputText.jsx';
import Button from '../Button/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addDispenser } from '../../slices/dispenserSlice.js'; // Importer le thunk pour ajouter une dispensation
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './forms.css';

const DispenserForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        idMatiere: '',
        idClasseEtude: '',
        idEnseignant: '',
        coefficient: '',
    });
    const [annee, setAnnee] = useState(dayjs(localStorage.getItem('year')) || dayjs(new Date().getFullYear())); // Utiliser dayjs ici// État séparé pour l'année
    const [errorMessage, setErrorMessage] = useState('');

    const matieres = useSelector(state => state.matieres.matieres);
    const classes = useSelector(state => state.classes.classes);
    const enseignants = useSelector(state => state.enseignants.enseignants);

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleYearChange = (newValue) => {
        if (newValue && newValue.isValid()) {
            setAnnee(newValue); // Mettre à jour l'état de l'année
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addDispenser({
                ...formData,
                annee: annee.year() // Envoyer l'année sous forme d'entier
            }));
            onClose();
            
        } catch (error) {
            console.error("Erreur lors de l'ajout de la dispensation:", error);
            setErrorMessage("Erreur lors de l'ajout de la dispensation. Veuillez réessayer.");
        }
    };

    return (
        <div className='form'>
            <h2 className="form-title">Affectation des matières dans les classes</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="annee" className="text-secondary font-bold">Année</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                    
                            views={['year']}
                            value={annee} // Utiliser l'état séparé pour l'année
                            onChange={(newValue) => {
                                if (newValue) {
                                    setAnnee(newValue); // Mettre à jour avec l'objet dayjs
                                   // localStorage.setItem('year', newValue.year()); // Enregistrer l'année dans localStorage
                                }
                            }}
                            renderInput={(params) => <input {...params} className="year-selector"/>}
                        />
                    </LocalizationProvider>
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

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="idClasseEtude" className="text-secondary font-bold">Classe</label>
                    <select
                        name="idClasseEtude"
                        onChange={(e) => handleChange(e, 'idClasseEtude')}
                        style={{ width: '100%', borderRadius: '10px' }}
                    >
                        <option value="">Sélectionner une classe</option>
                        {classes.map((classe) => (
                            <option key={classe.id} value={classe.id}>{classe.nom}</option>
                        ))}
                    </select>
                </div>
                <div className='gap-1' />

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="idEnseignant" className="text-secondary font-bold">Enseignant</label>
                    <select
                        name="idEnseignant"
                        onChange={(e) => handleChange(e, 'idEnseignant')}
                        style={{ width: '100%', borderRadius: '10px' }}
                    >
                        <option value="">Sélectionner un enseignant</option>
                        {enseignants.map((enseignant) => (
                            <option key={enseignant.id} value={enseignant.id}>{enseignant.prenom} {enseignant.nom}</option>
                        ))}
                    </select>
                </div>
                <div className='gap-1' />

                <InputText 
                    label={'Coefficient'} 
                    helper={'Entrer le coefficient de la dispensation'} 
                    type="number" 
                    handler={(e) => handleChange(e, 'coefficient')} 
                    name="coefficient" 
                />
                <div className='gap-1' />

                <Button text={'Créer'} width="100%" handler={handleSubmit} fontWeight="bold" />
            </form>
        </div>
    );
};

export default DispenserForm;
