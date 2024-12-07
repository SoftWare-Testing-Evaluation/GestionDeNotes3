import React, { useState } from 'react';
import image from '../assets/form.png';
import InputText from '../components/InputText/InputText.jsx';
import Button from '../components/Button/Button.jsx';
import Checkbox from '../components/Checkbox/Checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '../components/Typography/Typography.jsx';
import { authenticatePrefet } from '../services/api.service'; // Assurez-vous que cette fonction est correctement importée
import { Alert } from '@mui/material';
import { Close } from '@mui/icons-material';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '', // Ajout d'un champ pour le login
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handleEmailChange = (e) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(e.target.value)) {
            setMessageError('Format d\'email invalide');
        } else {
            setMessageError('');
        }
        setFormData({
            ...formData,
            email: e.target.value,
        });
    };

    const handleLoginChange = (e) => {
        setFormData({
            ...formData,
            login: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await authenticatePrefet(formData.login, formData.email, formData.password); // Correction ici
            // Stocker le token d'authentification
            localStorage.setItem('token', response.token); // Assurez-vous que la structure de la réponse est correcte
            // Rediriger l'utilisateur vers la page d'accueil
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setMessageError('Une erreur est survenue lors de la connexion : ' + error.message); // Message d'erreur amélioré
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className='flex h-[100vh]'>
            <form className='flex flex-col justify-center items-center h-full w-1/2 py-3 px-6 xl:px-12' onSubmit={handleSubmit}>
                <Typography text={'Sign in'} className='text-start w-full mb-5 font-bold text-6xl' isGradient />
                <InputText label={'Login'} helper={'Enter your login'} type={'text'} name={'login'} handler={handleLoginChange} />
                <InputText label={'Email'} helper={'Enter your email address'} type={'email'} name={'email'} handler={handleEmailChange} />
                <InputText label={'Password'} helper={'Enter your password'} type={'password'} name={'password'} handler={handlePasswordChange} />
                {messageError && (
                    <div style={{ position: 'relative', marginTop: '1rem' }}>
                        <Close onClick={() => setMessageError('')} sx={{ position: 'absolute', right: '0.25em', top: '25%', zIndex: '5', cursor: 'pointer', color: 'gray' }} />
                        <Alert severity="error">{messageError}</Alert>
                    </div>
                )}
                <Button text={'Sign in'} width={'100%'} margin={'25px 0 10px 0'} handler={handleSubmit} isLoading={isLoading} />
                <p className="text-sm text-gray-500 text-end w-full">
                    Not yet have an account? <Link to={'/signup'} className='text-[#F26100] text-[20px]'>Sign up</Link>
                </p>
                <Checkbox label='By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.' />
            </form>
            <div className="h-full w-1/2">
                <img src={image} alt="image" className='w-full h-full object-cover object-center' />
            </div>
        </main>
    );
};

export default SignIn;
