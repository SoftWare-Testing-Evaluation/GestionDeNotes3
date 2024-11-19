import React, { useState } from 'react'
import InputText from '../InputText/InputText.jsx'
import Button from '../Button/Button.jsx'

import './forms.css'
const SubjectForm = () => {
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

                <InputText label={'Nom'} helper={'Entrer le nom de la matiere'} type="text" handler={(e) => handleChange(e, 'nom')} name="nom" />
                <InputText label={'Coefficient'} helper={'Entrer le coefficient de la matiere'} type="text" handler={(e) => handleChange(e, 'effectif')} name="effectif" />
                <InputText label={'Enseignant'} helper={'Entrer le nom de l\'enseignant'} type="text" handler={(e) => handleChange(e, 'fees')} name="fees" />

                <div className='gap-1' />

                <Button text={'Créer'} width="100%" handler={(e) => handleSubmit(e)} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    )
}
export default SubjectForm