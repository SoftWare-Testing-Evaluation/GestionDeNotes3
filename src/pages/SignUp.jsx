// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerPrefet } from '../slices/prefetSlice'; // Importez votre nouvelle action
import image from '../assets/form.png';
import InputText from '../components/InputText/InputText.jsx';
import Button from '../components/Button/Button.jsx';
import Checkbox from '../components/Checkbox/Checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '../components/Typography/Typography.jsx';
import { Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        login: '',
        telephone: '', // Champ pour le numéro de téléphone
    });
    const [messageError, setMessageError] = useState('');
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Format d\'email invalide');
            } else {
                setEmailError('');
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageError(''); // Réinitialiser le message d'erreur
        if (emailError) {
            setEmailError('Veuillez entrer un e-mail valide.');
            return;
        }

        try {
            const resultAction = await dispatch(registerPrefet(formData));
            if (registerPrefet.fulfilled.match(resultAction)) {
                navigate('/');
                // Rediriger ou afficher un message de succès
            } else {
                setMessageError(resultAction.payload || 'Erreur lors de l\'enregistrement');
            }
        } catch (error) {
            console.error(error);
            setMessageError('Une erreur est survenue : ' + error.message);
        }
    };
    return (
        <main className='flex h-[100vh] '>
            <form className='flex flex-col justify-center items-center h-full w-1/2 py-3 px-6 xl:px-12'>

                <Typography text={'Sign up'} className='text-start w-full mb-5 font-bold text-6xl' isGradient />
                <InputText label={'Email'} helper={'Enter your email address'} type={'email'} name={'email'} handler={handleChange} isTextArea={false} icon={<MailIcon />} />
                {emailError && (
                    <div style={{ position: 'relative', marginTop: '1rem' }}>
                        <Close onClick={() => setEmailError('')} sx={{ position: 'absolute', right: '0.25em', top: '25%', zIndex: '5', cursor: 'pointer', color: 'gray' }} />
                        <Alert severity="error">{emailError}</Alert>
                    </div>
                )}
                <div className="flex max-lg:flex-col w-full">
                    <InputText label={'First name'} helper={'Enter your first name'} type={'text'} name={'nom'} handler={handleChange}/>
                    <InputText label={'Last name'} helper={'Enter your last name'} type={'text'} name={'prenom'} handler={handleChange} />
                </div>
                <InputText label={'Login'} helper={'Entrez votre login'} type={'text'} name={'login'} handler={handleChange} />
                <InputText label={'Password'} helper={'Enter your password'} type={'password'} name={'password'} handler={handleChange}  />
                <InputText label={'Phone number'} helper={'Enter your phone number'} type={'tel'} name={'telephone'} handler={() => {handleChange}}  />
                {messageError && <div className="text-red-500">{messageError}</div>}
                <Button text={'Sign up'} width={'100%'} margin={'25px 0 10px 0'} handler={handleSubmit}   />

                <p className="text-sm text-gray-500 text-end w-full">Already have an account? <Link to={'/'} className='text-[#F26100] text-[20px]'>Sign in</Link></p>

                <Checkbox label='By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.' />
            </form>
            <div className="h-full w-1/2">
                <img src={image} alt="image" className='w-full h-full object-cover object-center' />
            </div>
        </main>
    )
}

export default SignUp






