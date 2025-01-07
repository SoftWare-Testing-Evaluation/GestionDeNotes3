import React, { useState } from 'react';
import InputText from '../InputText/InputText.jsx';
import Button from '../Button/Button.jsx';
import { useDispatch, useSelector } from 'react-redux'; // Importer useSelector
import { addEleve } from '../../slices/eleveSlice'; // Importer le thunk
import { Select, Option } from '@mui/joy'; // Importer les composants Select et Option
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const StudentForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const classes = useSelector((state) => state.classes.classes); // Récupérer les classes depuis le store Redux
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        lieuNaissance: '',
        sexe: '',
        nomPere: '',
        nomMere: '',
        idClasseEtude: null, // Cette propriété sera remplie par le Select
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleClassChange = (e) => {
        const value = parseInt(e.target.value, 10); // Convertir en entier
        setFormData({
            ...formData,
            idClasseEtude: value // Mettre à jour avec l'entier
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await dispatch(addEleve(formData)); // Appeler le thunk pour ajouter l'élève
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'élève:", error);
        }
    };

    return (
        <div className='form'>
            <form>
                <InputText label={'Nom'} helper={'Entrer le nom de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nom')} />
                <InputText label={'Prenom'} helper={'Entrer le prenom de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'prenom')} />
                <InputText label={'Date de naissance'} helper={'Entrer la date de naissance de l\'étudiant'} type="date" handler={(e) => handleChange(e, 'dateNaissance')} />
                <InputText label={'Lieu de naissance'} helper={'Entrer le lieu de naissance de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'lieuNaissance')} />
                <InputText label={'Nom du père'} helper={'Entrer le nom du père de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nomPere')} />
                <InputText label={'Nom de la mère'} helper={'Entrer le nom de la mère de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nomMere')} />
                <div style={{display:'flex', flexDirection:'row', width:'auto', marginBottom:'20px', justifyContent:'space-between'}}>
                    <div  style={{display:'flex', flexDirection:'column', width:'40%'}}>
                    <label htmlFor="classe">Sexe</label>
                <select
                    placeholder={'sexe'}
                    indicator={<KeyboardArrowDown />}
                    onChange={(e) => handleChange({ target: { value: e.target.value } }, 'sexe')}
                    style={{
                        borderRadius: '5px',
                        padding: '5px',
                        border: '2px solid transparent', // Bordure par défaut
                        transition: 'border-color 0.3s ease' // Transition douce pour la couleur de la bordure
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = 'orange'} // Changer la couleur au survol
                    onMouseLeave={(e) => e.target.style.borderColor = 'transparent'} // Revenir à la couleur par défaut
                    onFocus={(e) => e.target.style.borderColor = 'orange'} // Changer la couleur au focus
                   onBlur={(e) => e.target.style.borderColor = 'transparent'} // Revenir à la couleur par défaut
                >
                    
                        <option value="M">Masculin</option>
                        <option value="F">Feminin</option>
                   
                </select>
                    </div>
                    <div  style={{display:'flex', flexDirection:'column', width:'50%'}}>
                    <label htmlFor="classe">Classe</label>
                <select
                    id='classe'
                    onChange={handleClassChange} // Utiliser la nouvelle fonction de gestion
                    style={{
                        borderRadius: '5px',
                        padding: '5px',
                        border: '2px solid transparent', // Bordure par défaut
                        transition: 'border-color 0.3s ease' // Transition douce pour la couleur de la bordure
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = 'orange'} // Changer la couleur au survol
                    onMouseLeave={(e) => e.target.style.borderColor = 'transparent'} // Revenir à la couleur par défaut
                    onFocus={(e) => e.target.style.borderColor = 'orange'} // Changer la couleur au focus
                    onBlur={(e) => e.target.style.borderColor = 'transparent'} // Revenir à la couleur par défaut
                >
                    <option value="">Choisir la classe</option> {/* Option par défaut */}
                    {classes.map((classe) => (
                        <option key={classe.id} value={classe.id}>
                            {classe.nom}
                        </option>
                    ))}
                </select>
                    </div>
                </div>
                
                <Button text={'Créer'} width="100%" handler={handleSubmit} fontWeight="bold" />
            </form>
        </div>
    );
};

export default StudentForm;
