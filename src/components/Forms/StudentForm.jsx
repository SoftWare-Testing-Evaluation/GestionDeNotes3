import React, { useState } from 'react'
import InputText from '../InputText/InputText.jsx'
import Button from '../Button/Button.jsx'

import './forms.css'
const StudentForm = () => {
    const [formData, setFormData] = useState({
        fees: '',
        nom: '',
        effectif: '',
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className='form'>
            <form>

                <InputText label={'Matricule'} helper={'Entrer le matricule de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Nom'} helper={'Entrer le nom de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Prenom'} helper={'Entrer le prenom de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Date de naissance'} helper={'Entrer le date de naissance de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Lieu de naissance'} helper={'Entrer le lieu de naissance de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Sexe'} helper={'Entrer le sexe de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Specialite'} helper={'Entrer la specialite de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Nationalite'} helper={'Entrer la nationalite de l\'etudiant'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Contact d\'urgence'} helper={'Entrer la contact d\'urgence'} type="text" handler={(e) => handleChange(e, 'fees')} name="fees" />

                <div className='gap-1' />

                <Button text={'Créer'} width="100%" handler={(e) => handleSubmit(e)} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    )
}
export default StudentForm