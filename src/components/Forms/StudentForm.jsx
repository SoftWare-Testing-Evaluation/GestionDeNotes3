


import React, { useState } from 'react';
import InputText from '../InputText/InputText.jsx';
import Button from '../Button/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addEleve } from '../../slices/eleveSlice';
import { Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

const StudentForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes.classes);

    const [matricule, setMatricule] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [lieuNaissance, setLieuNaissance] = useState('');
    const [sexe, setSexe] = useState('');
    const [nomPere, setNomPere] = useState('');
    const [telPere, setTelPere] = useState('');
    const [nomMere, setNomMere] = useState('');
    const [telMere, setTelMere] = useState('');
    const [redoublant, setRedoublant] = useState('');
    const [idClasseEtude, setIdClasseEtude] = useState('');
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTelPChange = (value) => {
        setTelPere(value);     
};
const handleTelMChange = (value) => {
    setTelMere(value);   
};
const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Stocker directement les fichiers
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('matricule', matricule);
    formDataToSend.append('nom', nom);
    formDataToSend.append('prenom', prenom);
    formDataToSend.append('dateNaissance', dateNaissance);
    formDataToSend.append('lieuNaissance', lieuNaissance);
    formDataToSend.append('sexe', sexe);
    formDataToSend.append('nomPere', nomPere);
    formDataToSend.append('telPere', telPere);
    formDataToSend.append('nomMere', nomMere);
    formDataToSend.append('telMere', telMere);
    formDataToSend.append('redoublant', redoublant);
    formDataToSend.append('idClasseEtude', idClasseEtude);

    // Ajout des images individuellement
    images.forEach((image) => {
        console.log(image)
        formDataToSend.append('images', image); // Ajoute chaque image
    });

    // Vérifiez le contenu de formDataToSend
    for (const entry of formDataToSend.entries()) {
        console.log(entry[0], entry[1]);
    }

    try {
        setIsLoading(true);
        await dispatch(addEleve(formDataToSend));
        onClose();
    } catch (error) {
        setErrorMessage("Erreur lors de l'ajout de l'élève : " + error.message);
    } finally {
        setIsLoading(false);
    }
};


    return (
        <div className='form'>
            <form onSubmit={handleSubmit}  enctype = " multipart/form-data ">
                <InputText label={'Matricule'} helper={'Entrer le matricule de l\'étudiant'} type="text" value={matricule} handler={(e) => setMatricule(e.target.value)} />
                <InputText label={'Nom'} helper={'Entrer le nom de l\'étudiant'} type="text" value={nom} handler={(e) => setNom(e.target.value)} />
                <InputText label={'Prénom'} helper={'Entrer le prénom de l\'étudiant'} type="text" value={prenom} handler={(e) => setPrenom(e.target.value)} />
                <InputText label={'Date de naissance'} helper={'Entrer la date de naissance de l\'étudiant'} type="date" value={dateNaissance} handler={(e) => setDateNaissance(e.target.value)} />
                <InputText label={'Lieu de naissance'} helper={'Entrer le lieu de naissance de l\'étudiant'} type="text" value={lieuNaissance} handler={(e) => setLieuNaissance(e.target.value)} />
                <InputText label={'Nom du père'} helper={'Entrer le nom du père de l\'étudiant'} type="text" value={nomPere} handler={(e) => setNomPere(e.target.value)} />
                <InputText label={'Contact du père'} helper={'Entrer le contact du père'} type={'tel'} value={telPere} handler={handleTelPChange}/>
                <InputText label={'Nom de la mère'} helper={'Entrer le nom de la mère de l\'étudiant'} type="text" value={nomMere} handler={(e) => setNomMere(e.target.value)} />
                <InputText label={'Contact de la mère'} helper={'Entrer le contact de la mère'} type={'tel'} value={telMere} handler={handleTelMChange} />

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="photo">Photos</label>
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                </div>

                <div className="images-preview-container">
                    {images.map((image, index) => (
                        <div key={index} className="image-preview">
                            <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                        <label htmlFor="sexe">Sexe</label>
                        <select value={sexe} onChange={(e) => setSexe(e.target.value)}>
                            <option value="M">Masculin</option>
                            <option value="F">Féminin</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                        <label htmlFor="redoublant">Redoublant ?</label>
                        <select value={redoublant} onChange={(e) => setRedoublant(e.target.value)}>
                            <option value="OUI">Oui</option>
                            <option value="NON">Non</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                        <label htmlFor="classe">Classe</label>
                        <select value={idClasseEtude} onChange={(e) => setIdClasseEtude(e.target.value)}>
                            <option value="">Choisir la classe</option>
                            {classes.map((classe) => (
                                <option key={classe.id} value={classe.id}>
                                    {classe.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {errorMessage && (
                    <div style={{ marginTop: '1rem' }}>
                        <Close onClick={() => setErrorMessage('')} sx={{ cursor: 'pointer', color: 'gray' }} />
                        <Alert severity="error">{errorMessage}</Alert>
                    </div>
                )}

                <Button text={'Créer'} width="100%" isLoading={isLoading} fontWeight="bold" />
            </form>
        </div>
    );
};

export default StudentForm;
