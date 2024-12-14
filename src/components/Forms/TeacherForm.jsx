import React, { useState, useEffect } from 'react';
import InputText from '../InputText/InputText.jsx';
import Button from '../Button/Button.jsx';
import './forms.css';

const TeacherForm = ({ teacher, onSubmit }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        specialite: '',
        grade: ''
    });

    useEffect(() => {
        if (teacher) {
            setFormData({
                nom: teacher.nom || '',
                prenom: teacher.prenom || '',
                email: teacher.email || '',
                specialite: teacher.specialite || '',
                grade: teacher.grade || ''
            });
        } else {
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                specialite: '',
                grade: ''
            });
        }
    }, [teacher]);

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = teacher ? { ...teacher, ...formData } : formData;
        console.log('Données à soumettre :', dataToSubmit);
        onSubmit(dataToSubmit); // Assurez-vous que onSubmit est bien une fonction
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <InputText label={'Nom'} helper={'Entrer le nom de l\'enseignant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" value={formData.nom} />
                <InputText label={'Prénom'} helper={'Entrer le prénom de l\'enseignant'} type="text" handler={(e) => handleChange(e, 'prenom')} name="prenom" value={formData.prenom} />
                <InputText label={'Email'} helper={'Entrer l\'email de l\'enseignant'} type="email" handler={(e) => handleChange(e, 'email')} name="email" value={formData.email} />
                <InputText label={'Spécialité'} helper={'Entrer la spécialité de l\'enseignant'} type="text" handler={(e) => handleChange(e, 'specialite')} name="specialite" value={formData.specialite} />
                <InputText label={'Grade'} helper={'Entrer le grade de l\'enseignant'} type="text" handler={(e) => handleChange(e, 'grade')} name="grade" value={formData.grade} />

                <div className='gap-1' />
                <Button text={teacher ? 'Mettre à jour' : 'Créer'} width="100%" handler={handleSubmit} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    );
};

export default TeacherForm;
