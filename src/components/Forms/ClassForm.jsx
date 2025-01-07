import React, { useState } from 'react';
import InputText from '../InputText/InputText.jsx';
import Button from '../Button/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addClasse } from '../../slices/classSlice.js';
import './forms.css';

const ClassForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.auth);

    // Vérifier si l'utilisateur est connecté
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <div>Vous devez être connecté pour créer une classe.</div>;
    }

    const [formData, setFormData] = useState({
        idPrefet: user.id,
        nom: '',
        scolarite: '',
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addClasse(formData)); // Appeler le thunk pour ajouter la classe
            onClose(); // Fermer le modal après l'ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout de la classe:", error);
        }
        console.log(formData);
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <InputText label={'Nom'} helper={'Entrer le nom de la classe'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Scolarité'} helper={'Entrer la scolarité'} type="number" handler={(e) => handleChange(e, 'scolarite')} name="scolarite" />
                <div className='gap-1' />
                <Button text={'Créer'} width="100%" handler={() => {}} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    );
}

export default ClassForm;
