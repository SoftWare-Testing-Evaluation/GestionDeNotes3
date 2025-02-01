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
        matricule:'',
        nom: '',
        prenom: '',
        dateNaissance: '',
        lieuNaissance: '',
        sexe: '',
        nomPere: '',
        telPere:'',
        nomMere: '',
        telMere:'',
        redoublant:'',
        idClasseEtude: null, // Cette propriété sera remplie par le Select
        photo: null, // Ajout du champ pour la photo
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0] // Stocker le fichier photo
        });
    };
    const handleTelPChange = (value) => {
            setFormData({
                ...formData,
                ['telPere']: value,
            });   
    };
    const handleTelMChange = (value) => {
        setFormData({
            ...formData,
            ['telMere']: value,
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
        
        
        

        try {
            await dispatch(addEleve(formData)); // Envoyer le FormData
            
            console.log(formData)
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'élève:", error);
        }
    };

    return (
        <div className='form'>
            <form>
            <InputText label={'Matricule'} helper={'Entrer le matricule de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'matricule')} />
                <InputText label={'Nom'} helper={'Entrer le nom de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nom')} />
                <InputText label={'Prenom'} helper={'Entrer le prenom de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'prenom')} />
                <InputText label={'Date de naissance'} helper={'Entrer la date de naissance de l\'étudiant'} type="date" handler={(e) => handleChange(e, 'dateNaissance')} />
                <InputText label={'Lieu de naissance'} helper={'Entrer le lieu de naissance de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'lieuNaissance')} />
                <InputText label={'Nom du père'} helper={'Entrer le nom du père de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nomPere')} />
                <InputText label={'Contact du père'} helper={'Enter le contact du père'} type={'tel'} name={'telPere'} handler={handleTelPChange}  />
                <InputText label={'Nom de la mère'} helper={'Entrer le nom de la mère de l\'étudiant'} type="text" handler={(e) => handleChange(e, 'nomMere')} />
                <InputText label={'Contact du père'} helper={'Enter le contact de la mère'} type={'tel'} name={'telMere'} handler={handleTelMChange}  />
                {/* Champ pour la photo */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="photo">Photo</label>
                <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
            </div>
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
                    <div  style={{display:'flex', flexDirection:'column', width:'40%'}}>
                    <label htmlFor="classe">Redoublant ?</label>
                <select
                    placeholder={'Redoublant ?'}
                    indicator={<KeyboardArrowDown />}
                    onChange={(e) => handleChange({ target: { value: e.target.value } }, 'redoublant')}
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
                    
                        <option value="OUI">Oui</option>
                        <option value="NON">Non</option>
                   
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
