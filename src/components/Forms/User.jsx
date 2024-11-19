import React, { useState } from 'react'
import InputText from '../InputText/InputText.jsx'
import Button from '../Button/Button.jsx'
import { useNavigate } from 'react-router-dom'

import './forms.css'
import { Close } from '@mui/icons-material'
import { Alert } from '@mui/material'
const User = ({ role }) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phone_number: '',
        role: role
    });

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };
    const handlePhone = (value) => {
        setFormData({
            ...formData,
            'phone_number': value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className='form'>
            <form>

                <InputText label={'Nom'} helper={'Entrer votre/vos nom(s)'} type="text" handler={(e) => handleChange(e, 'firstName')} name="firstName" />
                <InputText label={'Prenom'} helper={'Entrer votre/vos prenom(s)'} type="text" handler={(e) => handleChange(e, 'lastName')} name="lastName" />
                <InputText label={'Email'} helper={'Entrer votre email'} type="text" handler={(e) => handleChange(e, 'email')} name="email" />
                <InputText label={'Phone'} helper={'Number'} type="number" handler={handlePhone} name="phone_number" />
                <InputText label={'Password'} helper={'Your password'} type="password" handler={(e) => handleChange(e, 'password')} name="password" isTextArea={false} />

                <div className='gap-1' />

                <Button text={'Créer'} width="100%" handler={(e) => handleSubmit(e)} fontWeight="bold" isLoading={null} />
            </form>
        </div>
    )
}
export default User